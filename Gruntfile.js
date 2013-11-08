module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssc: {
          build: {
            options: {
              consolidateViaDeclarations: true,
              consolidateViaSelectors: true,
              consolidateMediaQueries: true
            },
            // dest: src
            files: {
              '_assets/css/main.min.css': '_assets/css/main.css'
            }
          }
        },

        cssmin: {
          combine: {
            files: {
              'assets/css/main.min.css': ['_assets/css/bootstrap.min.css', '_assets/css/main.min.css']
            }
          }
        },

        htmlhint: {
          build: {
            options: {
              'attr-lowercase': true,
              'attr-value-double-quotes': true,
              'doctype-first': true,
              'id-class-value': true,
              'id-unique': true,
              'img-alt-require': true,
              'spec-char-escape': true,
              'src-not-empty': true,
              'tag-pair': true,
              'tag-self-close': true,
              'tagname-lowercase': true
            },
            src: ['_site/**/*.html']
          }
        },

        uglify: {
          build: {
            files: {
              'assets/js/main.min.js': ['_assets/js/vendor/bootstrap.min.js', '_assets/js/plugins.js', '_assets/js/main.js'],
              'assets/js/lt-ie9.min.js': ['_assets/js/vendor/html5shiv.js', '_assets/js/vendor/respond.min.js'],
              'assets/js/modernizr-2.6.2.min.js': ['_assets/js/vendor/modernizr-2.6.2.min.js'],
              'assets/js/jquery-1.10.2.min.js': ['_assets/js/vendor/jquery-1.10.2.min.js']
            }
          }
        },

        sync: {
          main: {
            files: [
              {cwd: '_assets/fonts', src: ['**'], dest: 'assets/fonts/'},
              {cwd: '_assets/img', src: ['**'], dest: 'assets/img/'}
            ]
          }
        },

        shell: {
          jekyll: {
            options: {
              stdout: true
            },
            command: 'jekyll build',
          }
        },

        watch: {
          html: {
            files: ['_site/**/*.html'],
            tasks: ['htmlhint']
          },
          js: {
            files: ['_assets/js/**/*.js'],
            tasks: ['uglify']
          },
          css: {
            files: ['_assets/css/*.css'],
            tasks: ['buildcss']
          },
          imgFonts: {
            files: ['_assets/img/**', '_assets/fonts/**'],
            tasks: ['sync']
          },
          jekyll: {
            files: [
              '*.html', '*.yml', '*.txt', 'about-open-mapping/**/*', 'assets/**/*', 'faq/**/*', 'favicon.*', 'get-started/**/*',
              '_includes/**', 'site-map/**/*', 'stories/**/*', 'the-cause/**/*'
            ],
            tasks: 'shell:jekyll'
          }
        }
    });

    grunt.registerTask('default', ['sync', 'uglify', 'buildcss', 'shell:jekyll', 'htmlhint']);
    grunt.registerTask('buildcss', ['cssc', 'cssmin']);
};
