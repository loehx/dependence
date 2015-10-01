var assert = require('assert');
var nodeModulesProvider = require('../../lib/providers/nodeModules');

describe('File system provider', function() {

	it("Should return a dependency provider that provides a standard node module", function(done) {

		var provider = nodeModulesProvider();

		// Validate provider by getting the standard module 'fs'
		provider('fs', function(dependency) {
			assert(dependency, "Dependency is missing!");
			assert(typeof dependency === 'function', "Dependency has wrong type: " + typeof dependency);
			assert(dependency(), "Dependency should returns nothing!");
			assert(dependency().readFile, "Dependency should return 'fs'!");
			done();
		});
	});
});
