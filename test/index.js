var assert = require('assert');
var Dependence = require('../lib');

describe('Dependence plugin', function() {
	it('Should register and resolve a simple dependency.', function(done) {
		var dependencies = new Dependence();
		dependencies.register('isAlive', true);
		dependencies.resolve(function(isAlive) {
			assert(isAlive, "isAlive is true");
			done();
		});
	});

	it('Should resolve node modules automatically.', function(done) {
		var dependencies = new Dependence({
			node: true
		});
		dependencies.resolve(function(fs) {
			assert(fs, "fs could be resolved");
			assert(fs.readFile, "fs was resolved correctly");
			done();
		});
	});

	it('Should resolve .js files automatically.', function(done) {
		var dependencies = new Dependence({
			src: __dirname + '/../examples/*.js'
		});
		dependencies.resolve(function(dependency) {
			assert(dependency, "dependency could be resolved");
			assert(dependency.isExample(), "isExample() returns true");
			done();
		});
	});
});
