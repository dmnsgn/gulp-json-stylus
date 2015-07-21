var through = require('through2');
var isJSON = require('is-json');
var isString = require('is-string');

var gutil = require('gulp-util');
var gulpmatch = require('gulp-match');

const PLUGIN_NAME = 'gulp-json-stylus';

module.exports = function(options) {
  options = options || {};
  options.namespace = options.namespace || '';
  options.separator = options.separator || '-';

  if (!isString(options.namespace)) {
    throw new gutil.PluginError(PLUGIN_NAME, '`namespace` should be a string');
  }

  function addVariablesRecursive(obj, path, cb) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];

        if (typeof val !== 'object') {
          cb(options.namespace + path + key + ' = ' + val);
        } else {
          addVariablesRecursive(val, path + key + options.separator, cb);
        }
      }
    }
  }

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return;
    }

    if (!gulpmatch(file, '**/*.json')) {
      cb(new gutil.PluginError(PLUGIN_NAME, 'File is not a json.'));
      this.push(file);
      return;
    }

    var fileContent = file.contents.toString();
    if (isJSON(fileContent)) {

      var variables = [];
      addVariablesRecursive(JSON.parse(file.contents), '', function pushVariable(variable) {
        variables.push(variable);
      });

      try {
        file.contents = Buffer(variables.join('\n') + '\n');
        file.path = gutil.replaceExtension(file.path, '.styl');
        this.push(file);
      } catch (err) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }
      cb();
    } else {
      cb(new gutil.PluginError(PLUGIN_NAME, 'JSON is not valid.'));
    }

  });
};
