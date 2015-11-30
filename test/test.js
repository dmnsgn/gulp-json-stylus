'use strict';
var fs = require('fs');
var assert = require('assert');
var chai = require('chai');
var gutil = require('gulp-util');
var gulpJsonStylus = require('../');

var expect = chai.expect;

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

it('should display a PluginError when parsing the JSON', function(cb) {

  var stream = gulpJsonStylus({
    namespace: 'test'
  });

  stream.on('error', function (err) {
    expect(err).to.be.an.instanceof(gutil.PluginError);
    cb();
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/error.json',
    contents: fs.readFileSync(__dirname + '/error.json')
  }));

  stream.end();

});
