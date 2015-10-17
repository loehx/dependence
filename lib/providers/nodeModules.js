/**
 * Creates a dependency provider that tries to find a local node module. (e.g. 'fs' or 'path')
 * Please see unit tests for a better understanding.
 */
module.exports = function() {
	return function(name, callback) {
		try {
			var nodeModule = require(name);
			callback(function() {
				return nodeModule;
			});
		} catch (e) {
			console.error('[dependence] Error resolving node module: ' + name);
			console.error(e.stack);
			callback(undefined);
		}
	}
}
