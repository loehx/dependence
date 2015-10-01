var path = require('path');
var glob = require('glob');

/**
 * Creates a dependency provider that creates dependencies of .js files on the fly.
 * Please see unit tests for a better understanding.
 */
module.exports = function(globPath) {
	var dependencyPaths = {};

	// Add files to the dependencies
	if (typeof globPath !== 'string')
		throw "'globPath' should be of type string!";

	// Get file paths using glob
	var paths = glob.sync(globPath);

	// Make paths work with 'require'
	for (var i = 0; i < paths.length; i++) {
		var filePath = paths[i];
		var name = path.basename(filePath, '.js');

		dependencyPaths[name] = filePath.replace(/.js$/, '');
	}

	return function(name, callback) {
		try {
			var filePath = dependencyPaths[name];
			callback(filePath ? require(filePath) : undefined);
		} catch (e) {
			callback(undefined);
		}
	}
}