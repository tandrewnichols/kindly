var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt);
  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all', 'mocha']);
  grunt.registerTask('coverage', ['mochacov:html']);
  grunt.registerTask('travis', ['jshint:all', 'mocha', 'mochacov:lcov']);
}
