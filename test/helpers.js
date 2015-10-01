var assert = require('assert');
var helpers = require('../lib/helpers');

describe('Extraction of method parameters', function() {

   it("Extracts the method argument names of a anonymous function", function(done) {
		var args = helpers.extractFunctionParameters(function(argA, argB, argC) {  });

		assert(args, "Should return something");
		assert(args.length == 3, "Should return exactly 3 items");
		assert(args[0] == "argA", "Parameter no. 1 should be argA");
		assert(args[1] == "argB", "Parameter no. 2 should be argB");
		assert(args[2] == "argC", "Parameter no. 3 should be argC");
		done();
   });
});
