// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['gruntfile.js', 'app/**/*.js']
    },

    express: {
      options: {
        // Override defaults here 
      },
      dev: {
        options: {
          script: 'app/js/server.js'
        }
      },
      prod: {
        options: {
          script: 'app/js/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'app/js/server.js'
        }
      }
    },

    // configure watch to auto update ----------------
    watch: {

      // for stylesheets, watch css and less files 
      // only run less and cssmin stylesheets: { 
      //   files: ['app//*.css', 'app//*.less'],
      //   tasks: ['less', 'cssmin']
      // },

      // for scripts, run jshint and uglify 
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint']
      },

      express: {
        files: ['**/*.js'],
        tasks: ['express:dev'],
        options: {
          livereload: false,
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded 
        }
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      q: {
        command: 'q app/q/server.q -p 5555 -c 10000 10000'
      }
    },

   bgShell: {     
      q: {
        cmd: 'q app/q/server.q -p 5555 -c 10000 10000',
        bg: true
      }
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  //grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('node', ['jshint', 'express:dev', 'watch']);
  grunt.registerTask('q', ['shell:q']);
  grunt.registerTask('default', ['bgShell:q', 'jshint', 'express:dev']);
};