'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var gulpJsonStylus = require('../');

it('should process the data', function(cb) {
  var stream = gulpJsonStylus({
    namespace: 'test'
  });

  stream.on('data', function(file) {
    assert.equal(file.contents.toString(), fs.readFileSync(__dirname + '/variables.styl').toString());
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/variables.json',
    contents: fs.readFileSync(__dirname + '/variables.json')
  }));

  stream.end();
});
