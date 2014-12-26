module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        uglify : {
            bunch : {
                options : {
                    mangle : false,
                    compress : false,
                    preserveComments: true,
                    beautify : true
                },
                files : {
                    'jquery.jointextentries.js' : [ 'src/*' ]
                }
            },
            minify : {
                options : {
                    sourceMap : true
                },
                files : {
                    'jquery.jointextentries.min.js' : [ 'jquery.jointextentries.js' ]
                }
            }
        },
        watch: {
            options : {
                livereload: true
            },
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify']);

};
