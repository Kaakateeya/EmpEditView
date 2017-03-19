/*
 * grunt-init
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var packageJson = JSON.parse(fs.readFileSync('./package.json'));
var plugins = packageJson.buildSettings.plugins;
var css = packageJson.buildSettings.css;
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'app/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                report: 'min',
                mangle: false
            },
            build: {
                files: {

                    'dist/js/main.min.js': ['dist/src/main.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: [{
                        'dist/css/main.min.css': 'dist/src/main.css'
                    }

                ]

            }
        },
        dev_prod_switch: {
            options: {
                // Can be ran as `grunt --env=dev` or `grunt --env=prod`
                environment: grunt.option('env') || 'dev',
                env_char: '#',
                env_block_dev: 'env:dev',
                env_block_dev: 'SCRIPTS DATA',
                env_block_prod: 'SCRIPTSP DATA',
                env_block_test: 'env:test'
            },
            all: {
                files: {
                    'index.html': 'index.html',
                    'index.js': 'index.js'
                }
            }
        },
        scriptlinker: {
            dev: {
                options: {
                    startTag: '<!-- SCRIPTS DATA -->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: ''
                },
                files: [{
                    // Target-specific file lists and/or options go here. 
                    'index.html': [
                        plugins, 'index.js', 'app/**/*.js'
                    ]
                }],
            },
            prod: {
                options: {
                    startTag: '<!-- SCRIPTSP DATA -->',
                    endTag: '<!--SCRIPTSP END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: ''
                },
                files: {
                    // Target-specific file lists and/or options go here. 
                    'index.html': ['dist/js/*.js']
                },
            },
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                banner: "'use strict';\n",
                // process: function(src, filepath) {
                //     return '// Source: ' + filepath + '\n' +
                //         src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                // },
                // separator: ';'
            },
            js: { //target
                src: ['index.js', 'app/**/**/*.js', 'dist/html/templates.js',
                    '!common/services/authSvc.js',
                    'common/**/*.js',
                    'base/**/*.js', '!common/directives/editFooter.js',
                    '!common/directives/datePickerDirective.js'
                ],
                dest: 'dist/src/main.js'
            },
            css: {
                src: css,
                dest: 'dist/src/main.css'
            }
        },
        ngtemplates: {
            myapp: {
                options: {
                    base: "web",
                    module: "KaakateeyaEmpEdit",
                    prefix: '',
                },
                src: ['app/**/**/*.html', 'common/**/*.html', 'templates\*.html'],
                dest: "dist/html/templates.js"
            }
        }

    });

    grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'scriptlinker:dev']);

    // this task will only run the dev configuration 
    grunt.registerTask('dev', ['jshint', 'cssmin', 'scriptlinker:dev']);

    // only run production configuration 
    grunt.registerTask('prod', ['ngtemplates', 'concat', 'uglify', 'scriptlinker:prod']);

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dev-prod-switch');
    grunt.loadNpmTasks('grunt-scriptlinker');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

};