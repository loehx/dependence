module.exports = function(fs) {

	this.readFile = fs.readFileSync;

	return this;
};
