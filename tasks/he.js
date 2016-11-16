/*
 * grunt-he
 * https://github.com/mateusnroll/grunt-he
 *
 * Copyright (c) 2014 mateusnroll
 * Licensed under the MIT license.
 */

'use strict';
var he = require('he');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('he', 'Grunt task for the javascript HE html entities handler', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(', '));

      // Write the destination file.
      if(options.decode)
      {
        grunt.file.write(f.dest, he.decode(src, options));
      }
      else
      {
        grunt.file.write(f.dest, he.encode(src, options));
      }

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
