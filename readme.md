# gulp-json-stylus [![Build Status](https://travis-ci.org/dmnsgn/gulp-json-stylus.svg?branch=master)](https://travis-ci.org/dmnsgn/gulp-json-stylus)

> Gulp plugin that converts JSON files into stylus variables.


## Install

```
$ npm install --save-dev gulp-json-stylus
```


## Usage

```js
var gulp = require('gulp');
var gulpJsonStylus = require('gulp-json-stylus');

gulp.task('default', function () {
	return gulp.src('src/file.json')
		.pipe(gulpJsonStylus())
		.pipe(gulp.dest('dist'));
});
```


## API

### gulpJsonStylus(options)

#### options

##### namespace

Type: `string`  
Default: `''`

Add a namespace before each variable name.

##### separator

Type: `string`  
Default: `'-'`

Add a separator for objects variable.

```json
"colors": {
	"main": "#F00",
	"secondary": "#FF0"
}
```

```stylus
colors-main = #F00
colors-secondary = #F00

```



## License

MIT © [Damien Seguin](http://dmnsgn.me)
