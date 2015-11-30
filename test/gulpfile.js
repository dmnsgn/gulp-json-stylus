var gulp = require('gulp');
var gutil = require('gulp-util');
var jsonStylus = require('../');

gulp.task('default', function() {
  return gulp.src('error.json')
    .pipe(jsonStylus())
    .on('error', function(err) {
      gutil.log(err.message);
      this.emit('end');
    });
});
