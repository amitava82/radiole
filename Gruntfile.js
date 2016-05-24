var spawn = require('child_process').spawn;

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                includePaths: [
                    "build/public/lib/font-awesome/scss",
                    "build/public/lib/bootstrap-sass/assets/stylesheets"
                ],
                outputStyle: 'compressed'
            },

            dev: {
                files: {
                    "build/public/css/client.css": "client/scss/import.scss"
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    //require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 3 versions'}) // add vendor prefixes
                    //require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'build/public/css/client.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/public/css/',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('webpack', 'Build webpack', function(){
        grunt.util.spawn({
            cmd: 'webpack',
            args: ['p']
        }, function(err){
            console.log(err);
        });
    });

    grunt.registerTask('css', ['sass', 'postcss']);
    grunt.registerTask('prod', ['css', 'cssmin'])

};