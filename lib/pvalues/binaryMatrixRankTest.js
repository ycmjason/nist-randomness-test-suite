var math = require('../utils/math');
var chunk = require('lodash.chunk');

const M = 32;
const Q = 32;

module.exports = function binaryMatrixRankTest(bits){
  // pre: bits should be an array containing only 0 and 1 as a number
  
  // slice(0, -1) to remove the last chunk which possibly won't have length=M*Q
  var chunks = chunk(bits, M*Q).slice(0, -1);
  var matrices = chunks.map(c => new math.BinaryMatrix(chunk(c, Q))).slice(0, 38);

  var ranks = matrices.map(m => m.rank());

  var FM = ranks.filter(rank => rank === M).length;
  var FM1 = ranks.filter(rank => rank === M - 1).length;
  var FR = ranks.length - FM - FM1;

  var N = matrices.length;

  var chi2 = Math.pow(FM - 0.2888*N, 2)/(0.2888*N) + Math.pow(FM1 - 0.5776*N, 2)/(0.5776*N) + Math.pow(FR - 0.1336*N, 2)/(0.1336*N);

  var PValue = Math.exp(-chi2/2)
  return PValue;
};
