module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    jasmine_node: {
      specs: 'specs'
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.loadNpmTasks('grunt-jasmine-node-task');
  grunt.loadNpmTasks('grunt-contrib');

  grunt.registerTask('default', 'jasmine_node');
  grunt.registerTask('travis', 'jasmine_node');
};
