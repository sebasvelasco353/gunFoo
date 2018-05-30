module.exports = function (grunt) {
    /* configurations */
    grunt.initConfig({
        // pass options to plugins 
        concat: {
            js: {
                src: ['app/js/*.js'],
                dest: 'dist/scripts.js',
            },
        },
        sass: {
            build: {
                files: [{
                    src: 'app/sass/main.scss',
                    dest: 'dist/styles.css'
                }]
            }
        },
        watch: {
            js: {
                // if a js file changes concatenate then uglify
                files: ['app/js/*.js'],
                tasks: ['concat']
            },
            sass: {
                // if a sass file changes run the sass compiler
                files: ['app/sass/**/*.scss'],
                tasks: ['sass']
            },
        },
    });

    /* Load plugins */
    // Concatenate code
    grunt.loadNpmTasks('grunt-contrib-concat');
    // compile sass files into css
    grunt.loadNpmTasks('grunt-sass');
    // watch changes on files
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* Register a default task that conatenates, minyfies, compiles sass 
    into css and finally watches for changes so it can do the process again */
    grunt.registerTask('default', ['concat', 'sass', 'watch']);

}