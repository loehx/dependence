var assert = require('assert');
var fileSystemProvider = require('../../lib/providers/fileSystem');

describe('File system provider', function() {

	it("Should return a dependency provider that resolves .js files on the fly", function(done) {
		// Create a provider that returns the example dependency
		var provider = fileSystemProvider(__dirname + '/../../examples/dependency.js');

		// Validate provider
		provider("dependency", function(dependency) {
			assert(dependency, "Dependency could not be resolved!");
			assert(typeof dependency === 'function', "Dependency should be of type string! Actual type: " + typeof dependency);
			assert(dependency().isExample() === true, "Dependency should be the example dependency!");
			done();
		});
	});
});
