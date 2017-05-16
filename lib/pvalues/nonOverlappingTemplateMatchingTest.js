var leftPad = require('../utils/leftPad');

// Construction of aperiodic templates
var aperiodicTemplates = (function(){
  const M = 6;

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
  return templates;
})();

console.log(aperiodicTemplates);
