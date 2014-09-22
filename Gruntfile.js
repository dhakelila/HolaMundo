'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    root: {
      app: 'app',
      scripts: 'app/scripts',
      stylus: 'app/stylus',
      css: 'app/styles',
      mocha: 'public'
    },

    connect: {
      server: {
        options: {
          port: 3001,
          base: '<%= root.mocha %>',
          useAvailablePort: true
        }
      }
    },

    // compass: {
    //   options: {
    //     sassDir: '<%= root.sass %>',
    //     cssDir: '<%= root.css %>',
    //     imagesDir: '<%= root.app %>/images',
    //     generatedImagesDir: '<%= root.app %>/images/sprite',
    //     fontsDir: '<%= root.app %>/fonts',
    //     javascriptsDir: '<%= root.scripts %>',
    //     importPath: '<%= root.app %>/vendor',
    //     relativeAssets: false,
    //     assetCacheBuster: false
    //   },
    //   app: {
    //     options: {
    //       debugInfo: true,
    //       relativeAssets: true
    //     }
    //   }
    // },

    stylus: {
      // compile: {
      //   options: {
      //     paths: ['<%= root.styl %>'],
      //     // urlfunc: '<%= root.app %>/images', // use embedurl('test.png') in our code to trigger Data URI embedding
      //     use: [
      //       function () {
      //         return testPlugin('yep'); // plugin with options
      //       },
      //       require('fluidity') // use stylus plugin at compile time
      //     ]
      //   },
      //   files: {
      //     '<%= root.css %>': '<%= root.styl %>'
      //     // 'path/to/result.css': 'path/to/source.styl', // 1:1 compile
      //     // 'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
      //   }
      // },
      server: {
        options: {
          compress: false,
        },
        files: {
          '<%= root.app %>/styles/main.css': ['<%= root.app %>/stylus/main.styl'],
        }
      },
    },

    mocha_phantomjs: {
      options: {
        reporter: 'node_modules/grunt-mocha/node_modules/mocha/lib/reporters/nyan.js'
      },
      test: {
        options: {
          urls: ['http://0.0.0.0:<%= connect.server.options.port %>/test']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= root.scripts %>/{,*/}{,*/}*.js'
      ]
    },

    requirejs: {
      options: {
        preserveLicenseComments: false,
        useStrict: true,
        wrap: false
      }
    },

    watch: {
      options: {
        nospawn: true
      },
      stylus: {
        files: [
          '<%= root.stylus %>/{,*/}*{,*/}*.{scss,styl}'
        ],
        tasks: ['stylus:server']
      },
      test: {
        files: [
          'Gruntfile.js',
          '<%= root.scripts %>/{,*/}{,*/}*.js'
        ],
        tasks: ['test']
      }
    }
  });

  grunt.registerTask('test',[
    //'connect',
    'jshint'
    //'mocha_phantomjs'
  ]);

  grunt.registerTask('default', [
    //'test',
    'stylus:server'
  ]);
};
