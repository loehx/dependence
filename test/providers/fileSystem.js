var assert = require('assert');
var fileSystemProvider = require('../../lib/providers/fileSystem');

describe('File system provider', function() {

	it("Should return a dependency provider that resolves .js files on the fly", function(done) {
		// Create a provider that returns the example dependency
		var provider = fileSystemProvider(__dirname + '/../../examples/dependency.js');

		// Validate provider
		provider("dependency", function(dependency) {
			assert(dependency, "Dependency could not be resolved!");
			assert(typeof dependency === 'function', "Dependency should be a function! Actual type: " + typeof dependency);
			assert(dependency().isExample() === true, "Dependency should be the example dependency!");
			done();
		});
	});


	it("Should resolve an angular style dependency", function(done) {
		// Create a provider that returns the example dependency
		var provider = fileSystemProvider(__dirname + '/../../examples/angularStyle.js');

		// Validate provider
		provider("angularStyle", function(dependency) {
			assert(dependency, "Dependency could not be resolved!");
			assert(typeof dependency === 'function', "Dependency should be a function! Actual type: " + typeof dependency);
			assert.equal(dependency(1,2).getValue1(), 1);
			assert.equal(dependency(1,2).getValue2(), 2);
			assert.deepEqual(dependency.require, ['value-1', 'value-2']);
			done();
		});
	});
});
