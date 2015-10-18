var assert = require('assert');
var Dependence = require('../lib/dependence');
var dependencies;


describe('Dependencies', function() {

	beforeEach(function() {
		dependencies = new Dependence();
	})


	it("Should add a static value and resolve it", function(done) {
		dependencies.register('isExample', true);

		dependencies.resolve(function(isExample) {
			assert.equal(isExample, true);
			done();
		});
	});


	it("Should add a simple dependency and resolve it", function(done) {
		dependencies.register('helloWorld',
			function() {
				return "Hello World"
			}
		);

		dependencies.resolve('helloWorld', function(helloWorld) {
			assert(helloWorld, "Dependency has been resolved!");
			assert(typeof helloWorld === 'string', "Dependency is string! Actual: " + typeof getHelloWorld);
			assert.equal(helloWorld, "Hello World");
			done();
		});
	});


	it("Should add a static dependency and resolve it", function(done) {
		var i = 0;

		function counter() {
			return ++i;
		}
		counter.shared = true;

		dependencies.register('counter', counter);

		dependencies.resolve(function(counter) {
			assert.equal(counter, 1);
		});

		dependencies.resolve(function(counter) {
			assert.equal(counter, 1);
			done();
		});
	});


	it("Should add a dynamic dependency and resolve it", function(done) {
		var i = 0;

		function counter() {
			return ++i;
		}
		counter.shared = false;

		dependencies.register('counter', counter);

		dependencies.resolve(function(counter) {
			assert.equal(counter, 1);
		});

		dependencies.resolve(function(counter) {
			assert.equal(counter, 2);
			done();
		});
	});


	it("Should resolve a function.", function(done) {
		dependencies.register('helloWorld',
			function() {
				return "Hello World"
			}
		);

		dependencies.resolve(function(helloWorld) {
			assert(helloWorld, "Dependency was not resolved!");
			assert(typeof helloWorld === 'string', "Dependency has the wrong type! Actual: " + typeof getHelloWorld);
			assert(helloWorld == "Hello World", "Wrong dependency! Actual: " + helloWorld);
			done();
		});
	});


	it("Should resolve a dependency that needs to be resolved itself", function(done) {
		dependencies.register('level', 1);
		dependencies.register('nextLevel', function(level) {
			return level + 1
		});
		dependencies.resolve(function(nextLevel) {
			assert.equal(nextLevel, 2);
			done();
		});
	});


	it("Should overwrite a dependency", function(done) {
		dependencies.register('level', 5);
		dependencies.register('level', 2);

		dependencies.resolve(function(level) {
			assert(level, "'level' was not resolved!");
			assert(level == 2, "'level' should be 2! Actual: " + level);
			done();
		});
	});


	it("Should not resolve a dependency", function(done) {
		dependencies.resolve(function(notExistingDependency) {
			assert(!notExistingDependency, "'notExistingDependency' is null or undefined");
			done();
		});
	});


	it("Should detect circular dependencies.", function(done) {
		dependencies.register('DependencyA', function(DependencyB) {
			return DependencyB;
		});

		dependencies.register('DependencyB', function(DependencyC) {
			return DependencyC;
		});

		dependencies.register('DependencyC', function(DependencyA) {
			return DependencyA;
		});

		dependencies.resolve(function(DependencyA) {
			assert(DependencyA === null, "DependencyA should be null!");
			done();
		})
	});

});



describe("Providers", function() {

	beforeEach(function() {
		dependencies = new Dependence();
	})


	it("Should use custom provider", function(done) {
		dependencies.use(function(name, callback) {
			if (name === 'level') {
				callback(function() {
					return 2;
				});
			} else {
				callback();
			}
		})

		dependencies.resolve(function(level) {
			assert(level, "'level' was not resolved!");
			assert(level == 2, "'level' should be 2! Actual: " + level);
			done();
		});
	});


	it("Should overwrite a custom provider", function(done) {
		dependencies.use(function(name, callback) {
			if (name === 'level') {
				callback(function() {
					return 2;
				});
			} else {
				callback();
			}
		})

		dependencies.use(function(name, callback) {
			if (name === 'level') {
				callback(function() {
					return 5;
				});
			} else {
				callback();
			}
		})

		dependencies.resolve(function(level) {
			assert(level, "'level' was not resolved!");
			assert(level == 5, "'level' should be 5! Actual: " + level);
			done();
		});
	});
});
