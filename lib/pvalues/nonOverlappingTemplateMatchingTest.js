var leftPad = require('../utils/leftPad');
var math = require('../utils/math');
var range = require('../utils/range');

// Randomly pick a template from the aperiodic template
var aperiodicTemplate = (function(){
  const M = 9;

  function isAperiodic(A){
    var A_last_index = A.length - 1;
    for(let i = 1; i < M; i++) {
      match = 1;
      if((A[0] != A[A_last_index]) &&
        ((A[0] != A[A_last_index -1]) || (A[1] != A[A_last_index]))) {
        for(let c = 0; c <= A_last_index-i; c++) {
          if(A[c] != A[c+i]) {
            match = 0;
            break;
          }
        }
      }

      if(match) return false;
    }

    if(!match) return true;
  }

  var templates = [];
  for(i = 1; i < Math.pow(2, M); i++){
    var bits = leftPad(i.toString(2), M, '0');
    if(isAperiodic(bits)) templates.push(bits);
  }
  return templates[Math.floor(Math.random() * templates.length)];
})();

module.exports = function nonOverlappingTemplateMatchingTest(bits){
  const NUMBER_OF_BLOCKS = 8;
  const BLOCK_LENGTH = Math.floor(bits.length / NUMBER_OF_BLOCKS);
  var blocks = range(NUMBER_OF_BLOCKS).map((i) => bits.slice(i * BLOCK_LENGTH, (i+1) * BLOCK_LENGTH));
  var counts = blocks.map(block => countOccurrencesOf(block, aperiodicTemplate));

  var n = bits.length;
  var m = aperiodicTemplate.length;
  var N = NUMBER_OF_BLOCKS;
  var M = BLOCK_LENGTH;
  var W = counts;
  
  var expected_mean = (M - m + 1) / Math.pow(2, m);
  var expected_variance = M * ((1/Math.pow(2, m)) - ((2*m -1)/(Math.pow(2, 2*m))))

  var chi2 = math.sum(W.map((w) => Math.pow(w - expected_mean, 2) / expected_variance));

  var pvalue = math.igamc(N/2, chi2/2);
  return pvalue
};

function countOccurrencesOf(block, template){
  var count = 0;
  for(let i = 0; i < block.length; i++){
    var window_ = block.slice(i, i + template.length).join('');
    if(window_.length != template.length) break;
    if(window_ === template){
      count++;
      i += template.length;
    }
  }
  return count;
}
