module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

	var config = {
		app: 'app'
	};

	grunt.initConfig({

		config: config,

		connect: {
			options: {
				protocol: 'http',
				hostname: 'localhost',
				port: 8080,
				livereload: true
			},
			app: {
				options: {
					middleware: function(connect) {
						return [
							connect().use('/bower_components', connect.static('./bower_components')),
							connect().use('/api/games', connect.static('./api/games.json')),
							connect.static(config.app)
						];
					},
					open: true
				}
			},
			coverage: {
				options: {
					base: '<%= karma.app.coverageReporter.dir %>/<%= karma.app.coverageReporter.subdir %>',
					open: true,
					port: 8081
				}	
			}
		},

		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			html: {
				files: ['<%= config.app %>/*.html']
			},
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			scripts: {
				files: ['<%= config.app %>/scripts/**'],
				tasks: ['includeSource']
			},
			templates: {
				files: ['<%= config.app %>/scripts/**/*.html'],
				tasks: ['html2js']
			}
		},

		wiredep: {
			app: {
				src: '<%= config.app %>/index.html',
				options: {
					ignorePath: '..'
				}
			}
		},

		html2js: {
			app: {
				options: {
					base: '<%= config.app %>/scripts',
					module: 'app-templates'
				},
				src: ['<%= config.app %>/scripts/**/*.html'],
				dest: '<%= config.app %>/scripts/app-templates.js'
			}
		},

		includeSource: {
			options: {
				basePath: '<%= config.app %>',
				baseUrl: '/'
			},
			app: {
				src: '<%= config.app %>/index.html',
				dest: '<%= config.app %>/index.html'
			}
		},

		karma: {
			app: {
				configFile: 'karma.conf.js',
				coverageReporter: {
		            type: 'html',
		            dir: 'stats',
		            subdir: 'coverage'
		        }
			}
		}

	});

	grunt.registerTask('default', ['dev']);

	grunt.registerTask('dev', [
		'wiredep',
		'html2js',
		'includeSource',
		'connect:app',
		'watch'
	]);

	grunt.registerTask('test', [
		'connect:coverage',
		'karma'
	]);

};