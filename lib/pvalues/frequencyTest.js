var math = require('../utils/math');

module.exports = function frequencyTest(bits){
  // pre: bits should be an array containing only 0 and 1 as a number
  var s = Math.abs(math.sum(bits.map((b) => 2*b - 1))) / Math.sqrt(bits.length);
  var PValue = math.erfc(s / Math.sqrt(2));
  return PValue;
};
