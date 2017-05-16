var errors = require('../errors');

module.exports = function range(start, stop, step){
  // usage:
  //   range(5) => [0, 1, 2, 3, 4]
  //   range(3, 6) => [3, 4, 5]
  //   range(0, 11, 2) => [0, 2, 4, 6, 8, 10]
  if(!start) throw errors.MissingArgError;
  if(!stop && stop !== 0) {
    stop = start;
    start = 0;
  }
  step = step || 1;
  var ret = [];
  for(var i = start; i < stop; i += step){
    ret.push(i);
  }
  return ret;
};
