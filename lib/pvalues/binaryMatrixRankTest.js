var math = require('../utils/math');
var chunk = require('lodash.chunk');

const M = 32;
const Q = 32;

module.exports = function binaryMatrixRankTest(bits){
  // pre: bits should be an array containing only 0 and 1 as a number
  
  // slice(0, -1) to remove the last chunk which possibly won't have length=M*Q
  var chunks = chunk(bits, M*Q).slice(0, -1);
  var matrices = math.matrix(chunk(chunks, Q));
  return PValue;
};
