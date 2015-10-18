module.exports = ['value-1', 'value-2', function(valueA, valueB) {

	this.getValue1 = function() {
		return valueA;
	}

   this.getValue2 = function() {
      return valueB;
   }

	return this;
}];
