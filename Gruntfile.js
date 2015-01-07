/*
 * grunt-checkFileSize
 * https://github.com/laurent1/grunt-checkFileSize
 *
 * Copyright (c) 2015 Laurent Jacquot
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    checkFileSize: {
      options: { // global plugin options configuration
        // folderToScan : "./files",
        debug: true
      }, 
      dev: { // will use the global plugin options configuration
        src: ['./files', './files2']
      },
      prod: {
        options: { // can specify an options configuration per target
          debug:false
        },
        files: [
          {src: './files'},
          {src: './files2'},
        ]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'checkFileSize', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
