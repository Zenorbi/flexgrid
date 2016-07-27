flexgrid
========

Bootstrap like grids for scss using flexboxes. The main purpose of this small library is to separate presentation from semantics.

Example
-------

Move from this:

```html
<section class="row">
	<article class="col-xs-12 col-md-9">
		...
	</article>
	<aside class="col-xs-12 col-md-3">
		...
	</aside>
</section>
```

To this:

```html
<section>
	<article>
		...
	</article>
	<aside>
		...
	</aside>
</section>
```

```scss
section {
	@include grid-row();
}
section article {
	@include grid-col(12);
	@include grid-col-break(md, 9);
}
section aside {
	@include grid-col(12);
	@include grid-col-break(md, 3);
}
```

All of the non-semantic code transfered from html to scss.

[Another example](../blob/master/grid-example.html)

Variables
---------

```scss
$grid-columns: 12 !default;
$grid-gutter-width: 20px !default;

$grid-breakpoints: (
  // Extra small screen / phone
  xs: 0,
  // Small screen / phone
  sm: 544px,
  // Medium screen / tablet
  md: 768px,
  // Large screen / desktop
  lg: 992px,
  // Extra large screen / wide desktop
  xl: 1200px
) !default;
```
Mixins
------

```scss
@mixin grid-row($gutter: $grid-gutter-width)

@mixin grid-col-make($gutter: $grid-gutter-width)

@mixin grid-col($span, $columns: $grid-columns, $gutter: $grid-gutter-width)

@mixin grid-col-offset($span, $columns: $grid-columns, $gutter: $grid-gutter-width)

@mixin grid-generate-classes($columns: $grid-columns, $gutter: $grid-gutter-width)


@mixin grid-col-break($name, $span, $columns: $grid-columns, $gutter: $grid-gutter-width, $breakpoints: $grid-breakpoints)

@mixin grid-col-offset-break($name, $span, $columns: $grid-columns, $gutter: $grid-gutter-width, $breakpoints: $grid-breakpoints)

@mixin grid-break-generate-classes($columns: $grid-columns, $gutter: $grid-gutter-width, $breakpoints: $grid-breakpoints)
```

Caveats
-------

Make sure you include the mixins in the correct order.

- Define your breaking (responsive) columns from smallest to largest, otherwise the later defined small will overwrite the earlier defined medium breakpoint.
- Define your columns before defining the offset of that column.

```scss
//Small first
@include grid-col-break(sm, 10); //Column first
@include grid-col-offset-break(sm, 1); //Offset for it later

//Larger later
@include grid-col-break(md, 9);
@include grid-col-offset-break(md, 2);
```
