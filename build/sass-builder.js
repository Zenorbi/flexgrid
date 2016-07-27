"use strict";
const through2 = require("through2");
const gutil = require("gulp-util");
const sass = require("gulp-sass");

function createCompiler(options) {
	let errored = false;
	let compiler = sass(options);
	let wrapper = through2.obj(function(file, enc, cb) {
		if (errored) return cb(); //The compiler errored, just drain all files
		compiler.write(file, enc, function() {
			cb(); //Compiler consumed the file
		});
	}, function(cb) { //Flushing the underlying compiler
		if (errored) return cb(); //The compiler errored, so nothing to flush
		//Send the end flag and wait for the end event
		compiler.once("end", function() {
			cb();
		});
		compiler.end();
	});
	//Data from the compiler, forward it
	compiler.on("data", function(data) {
		wrapper.push(data);
	});
	//Compiler errored, log it and mark the compiler as dead
	compiler.once("error", function(err) {
		gutil.log(gutil.colors.red("[error]"), err);
		errored = true;
	});
	return {
		compilation: wrapper,
		reportError: function() {
			return function() {
				if (errored) this.emit("error", new Error("Failed to compile sass"));
			};
		}
	};
}
module.exports.createCompiler = createCompiler;
