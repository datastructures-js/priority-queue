module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      src: ['./*.js', './*.spec.js']
    },
    mochaTest: {
      files: ['./*.spec.js']
    },
    mocha_istanbul: {
      coverage: {
        src: './',
        options: {
          mask: '*.spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul']);
  grunt.registerTask('build', ['lint', 'coverage']);
};
