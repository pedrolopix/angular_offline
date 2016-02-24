(function () {
// Generated on 2015-05-20 using generator-jhipster 2.11.1
    'use strict';
    require('fs');

// Returns the first occurence of the version number
    var parseVersionFromBuildGradle = function () {
//    var versionRegex = /^version\s*=\s*[',"]([^',"]*)[',"]/gm; // Match and group the version number
//    var buildGradle = fs.readFileSync('build.gradle', "utf8");
//    return versionRegex.exec(buildGradle)[1];
        return '1.0.0';
    };

// usemin custom step
    var useminAutoprefixer = {
        name: 'autoprefixer',
        createConfig: function (context, block) {
            if (block.src.length === 0) {
                return {};
            } else {
                return require('grunt-usemin/lib/config/cssmin').createConfig(context, block); // Reuse cssmins createConfig
            }
        }
    };

    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt);
        require('time-grunt')(grunt);

        grunt.initConfig({
            conf: {
                // configurable paths
                app: require('./bower.json').appPath || 'app',
                dist: 'dist'
            },
            watch: {
                bower: {
                    files: ['bower.json'],
                    tasks: ['wiredep', 'includeSource']
                },
                ngconstant: {
                    files: ['Gruntfile.js', 'build.gradle'],
                    tasks: ['ngconstant:dev']
                },
                jsStyle: {
                    files: ['public/app/**/*.js', 'public/assets/styles/**/*.css'],
                    tasks: ['includeSource']
                },
                hints: {
                    files: ['public/app/**/*.js'],
                    tasks: ['jshint']
                }
            },
            autoprefixer: {
                // not used since Uglify task does autoprefixer,
                //    options: ['last 1 version'],
                //    dist: {
                //        files: [{
                //            expand: true,
                //            cwd: '.tmp/styles/',
                //            src: '**/*.css',
                //            dest: '.tmp/styles/'
                //        }]
                //    }
            },
            wiredep: {
                app: {
                    src: ['public/index.html'],
                    exclude: [
                        /angular-i18n/,  // localizations are loaded dynamically
                        /swagger-ui/,
                        /tinymce-dist/
                    ]
                },
                test: {
                    src: 'src/test/javascript/karma.conf.js',
                    exclude: [/angular-i18n/, /swagger-ui/, /angular-scenario/],
                    ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected javaapp
                    devDependencies: true,
                    fileTypes: {
                        js: {
                            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
                }
            },
            browserSync: {
                dev: {
                    bsFiles: {
                        src: [
                            'public/app/**/*.html',
                            'public/app/**/*.json',
                            'public/assets/styles/**/*.css',
                            'public/app/**/*.js',
                            'public/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg,ico}',
                            'tmp/**/*.{css,js}'
                        ]
                    }
                },
                options: {
                    watchTask: true,
                    //proxy: "localhost:8080",
                    server: {
                        baseDir: 'public/'
                        //middleware: function (req, res, next) {
                        //    console.log("Hi from middleware");
                        //    next();
                        //}
                    }
                }
            },
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= conf.dist %>/*',
                            '!<%= conf.dist %>/.git*'
                        ]
                    }]
                },
                server: '.tmp'
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: [
                    'Gruntfile.js',
                    'public/app/app.js',
                    'public/app/**/*.js',
                    'public/app/components/**/*.js'
                ]
            },
            coffee: {
                options: {
                    sourceMap: true,
                    sourceRoot: ''
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'public/app',
                        src: ['app/app/**/*.coffee', 'app/components/**/*.coffee'],
                        dest: '.tmp/app',
                        ext: '.js'
                    }]
                },
                test: {
                    files: [{
                        expand: true,
                        cwd: 'test/spec',
                        src: '**/*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }]
                }
            },
            concat: {
                // not used since Uglify task does concat,
                // but still available if needed
                //    dist: {}
            },
            rev: {
                dist: {
                    files: {
                        src: [
                            '<%= conf.dist %>/app/**/*.js',
                            '<%= conf.dist %>/assets/styles/**/*.css',
                            '<%= conf.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg,ico}'
                        ]
                    }
                }
            },
            useminPrepare: {
                html: 'public/**/*.html',
                options: {
                    dest: '<%= conf.dist %>',
                    flow: {
                        html: {
                            steps: {
                                js: ['concat', 'uglifyjs'],
                                css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
                            },
                            post: {}
                        }
                    }
                }
            },
            usemin: {
                html: ['<%= conf.dist %>/**/*.html'],
                css: ['<%= conf.dist %>/assets/styles/**/*.css'],
                js: ['<%= conf.dist %>/app/**/*.js'],
                options: {
                    assetsDirs: [
                      '<%= conf.dist %>',
                      '<%= conf.dist %>/assets/styles',
                      '<%= conf.dist %>/assets/images',
                      '<%= conf.dist %>/assets/fonts'],
                    patterns: {
                        js: [
                            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg|ico))/gm,
                              'Update the JS to reference our revved images']
                        ]
                    },
                    dirs: ['<%= conf.dist %>']
                }
            },
            imagemin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'public/assets/images',
                        src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
                        dest: '<%= conf.dist %>/assets/images'
                    }]
                }
            },
            svgmin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'public/assets/images',
                        src: '**/*.svg',
                        dest: '<%= conf.dist %>/assets/images'
                    }]
                }
            },
            cssmin: {
                // By default, your `index.html` <!-- Usemin Block --> will take care of
                // minification. This option is pre-configured if you do not wish to use
                // Usemin blocks.
                // dist: {
                //     files: {
                //         '<%= conf.dist %>/styles/main.css': [
                //             '.tmp/styles/**/*.css',
                //             'styles/**/*.css'
                //         ]
                //     }
                // }
                options: {
                    root: 'public' // Replace relative paths for static resources with absolute path
                }
            },
            ngtemplates: {
                dist: {
                    cwd: 'public',
                    src: ['app/**/*.html', 'app/components/**/*.html'],
                    dest: '.tmp/templates/templates.js',
                    options: {
                        module: 'erpRetail',
                        usemin: 'app/main.js',
                        htmlmin: {
                            removeCommentsFromCDATA: true,
                            // https://github.com/conf/grunt-usemin/issues/44
                            collapseWhitespace: true,
                            collapseBooleanAttributes: true,
                            conservativeCollapse: true,
                            removeAttributeQuotes: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true
                        }
                    }
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeCommentsFromCDATA: true,
                        // https://github.com/conf/grunt-usemin/issues/44
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        conservativeCollapse: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        keepClosingSlash: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= conf.dist %>',
                        src: ['*.html'],
                        dest: '<%= conf.dist %>'
                    }]
                }
            },
            // Put files not handled in other tasks here
            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            dot: true,
                            cwd: 'public',
                            dest: '<%= conf.dist %>',
                            src: [
                                '*.html',
                                'app/**/*.html',
                                'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg,ico}',
                                'assets/fonts/*',
                                'assets/lazzy/**/*',
                                'app/locale/**/*',
                                'bower_components/outdated-browser/outdatedbrowser/lang/*.html',
                                'bower_components/font-awesome/fonts/*',
                                'bower_components/bootstrap/dist/fonts/*',
                                'bower_components/tinymce-dist/**/*',
                                'bower_components/ace-builds/src-noconflict/**/*'
                            ]
                        },
                        {
                            expand: true,
                            cwd: '.tmp/assets/images',
                            dest: '<%= conf.dist %>/assets/images',
                            src: [
                                'generated/*'
                            ]
                        }]
                },
                generateOpenshiftDirectory: {
                    expand: true,
                    dest: 'deploy/openshift',
                    src: [
                        'pom.xml',
                        'src/main/**'
                    ]
                }
            },
            concurrent: {
                server: [],
                test: [],
                dist: [
                    'imagemin',
                    'svgmin'
                ]
            },
            karma: {
                unit: {
                    configFile: 'src/test/javascript/karma.conf.js',
                    singleRun: true
                }
            },
            cdnify: {
                dist: {
                    html: ['<%= conf.dist %>/*.html']
                }
            },
            ngAnnotate: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '.tmp/concat/app',
                        src: '*.js',
                        dest: '.tmp/concat/app'
                    }]
                }
            },
            buildcontrol: {
                options: {
                    commit: true,
                    push: false,
                    connectCommits: false,
                    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
                }
            },
            ngconstant: {
                options: {
                    name: 'app',
                    deps: false,
                    wrap: ['(function()',
                      '{ \'use strict\';',
                        '// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE',
                      '{%= __ngModule %}}',
                      '());'].join('\n')
                },
                dev: {
                    options: {
                        dest: 'public/app/appconstants.js'
                    },
                    constants: {
                        ENV: 'dev',
                        APIURL: 'http://192.168.32.119:9000/',
                        VERSION: parseVersionFromBuildGradle()
                    }
                },
                prod: {
                    options: {
                        dest: 'public/app/appconstants.js'
                    },
                    constants: {
                        ENV: 'prod',
                        API_URL: '',
                        VERSION: parseVersionFromBuildGradle()
                    }
                }
            },
            includeSource: {
                options: {
                    basePath: 'public/',
                    baseUrl: ''
                },
                myTarget: {
                    files: {
                        'public/index.html': 'public/index.html'
                    }
                }
            }
        });

        grunt.registerTask('serve', [
            'clean:server',
            'wiredep',
            'ngconstant:dev',
            'includeSource',
            'concurrent:server',
            'browserSync',
            'watch'
        ]);

        grunt.registerTask('server', function (target) {
            grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
            grunt.task.run([target ? ('serve:' + target) : 'serve']);
        });

        grunt.registerTask('test', [
            'clean:server',
            'wiredep:test',
            'ngconstant:dev',
            'concurrent:test',
            'karma'
        ]);

        grunt.registerTask('build', [
            'clean:dist',
            'wiredep:app',
            'ngconstant:prod',
            'includeSource',
            'jshint',
            'useminPrepare',
            'ngtemplates',
            'concurrent:dist',
            'concat',
            'copy:dist',
            'ngAnnotate',
            'cssmin',
            'autoprefixer',
            'uglify',
            'rev',
            'usemin',
            'htmlmin'
        ]);

        //grunt.registerTask('appendSkipBower', 'Force skip of bower for Gradle', function () {
        //
        //    if (!grunt.file.exists(filepath)) {
        //        // Assume this is a maven project
        //        return true;
        //    }
        //
        //    var fileContent = grunt.file.read(filepath);
        //    var skipBowerIndex = fileContent.indexOf("skipBower=true");
        //
        //    if (skipBowerIndex !== -1) {
        //        return true;
        //    }
        //
        //    grunt.file.write(filepath, fileContent + '\nskipBower=true\n');
        //});

        grunt.registerTask('default', [
            //'test',
            'build'
        ]);

        grunt.registerTask('hints', [
            'jshint'
        ]);

        grunt.registerTask('whints', [
            'jshint',
            'watch:hints'
        ]);

    };
}());
