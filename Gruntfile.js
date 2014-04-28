module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/css/main.css' : 'app/sass/main.scss'
				}
			}
		},
    concat: {
      dist: {
        src: ['app/js/*.js'],
        dest: 'public/js/main.js',
    },
		watch: {
       css: {
				files: '**/*.scss',
				tasks: ['sass']
       }
     }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default',['watch']);
  // :wa|!grunt build  <-- Vim command
  grunt.registerTask('build',['sass', 'concat']);
}
