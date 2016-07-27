"use strict";
const fs = require("fs");
const gulp = require("gulp");
const path = require("path");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

const sassBuilder = require("./sass-builder");

const options = require(path.resolve("./css-tools.json"));

const sources = options.sources;
const outputFolder = options.outFolder;
const autoprefixerOptions = options.autoprefixerOptions;

gulp.task("sass", function() {
	const sassCompiler = sassBuilder.createCompiler();
	return gulp.src(sources)
		.pipe(sourcemaps.init())
		.pipe(sassCompiler.compilation)
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(outputFolder))
		.on("end", sassCompiler.reportError());
});
gulp.task("watch", ["sass"], function() {
	return gulp.watch(sources, ["sass"]);
});
