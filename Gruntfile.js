module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      src: ['src/*.js', 'test/*.spec.js']
    },
    mochaTest: {
      files: ['test/*.test.js']
    },
    mocha_istanbul: {
      coverage: {
        src: './',
        options: {
          mask: 'test/*.test.js'
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
