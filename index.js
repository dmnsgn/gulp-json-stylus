'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {
	options = options || {};
	// if (!options.namespace) {
	// 	throw new gutil.PluginError('gulp-json-stylus', '`namespace` required');
	// }

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-json-stylus', 'Streaming not supported'));
			return;
		}

		try {
			// file.contents = new Buffer(someModule(file.contents.toString(), options));
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-json-stylus', err));
		}

		cb();
	});
};
