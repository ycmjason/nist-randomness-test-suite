var math = require('mathjs');

var PRECISION = 8;

var SigFigConsistancy = exports.SigFigConsistancy = function(accuracy){
  this.last_result = NaN;

  this.isConsistant = function(x){
    if(typeof x !== "number") throw "SigFigConsistancy.isConsistant: x is not a number!";
    var last_result = this.last_result;
    this.last_result = x;
    console.log(last_result.toPrecision(accuracy), x.toPrecision(accuracy))
    if(!last_result) return false;
    return last_result.toPrecision(accuracy) === x.toPrecision(accuracy);
  }
};

var rectangle_method = exports.rectangle_method = function(f, lower, upper){
  // Rectangle Method for estimating integration numerically
  var RECTANGLE_COUNT_FROM = 30000;

  if(lower > upper) throw "rectangle_method: lower > upper";

  var rec_meth_helper = function(f, lower, upper, rectangleCount){
    var rectangle_area = (x, y) => x * y;
    var sum = 0;
    var step = (upper - lower) / rectangleCount;
    for(var i = lower; i < upper; i += step){
      sum += rectangle_area(f(i), step);
    }
    return sum;
  };

  var result = NaN;
  var sfc = new SigFigConsistancy(PRECISION);
  for(var rectangleCount = RECTANGLE_COUNT_FROM; !sfc.isConsistant(result); rectangleCount++){
    result = rec_meth_helper(f, lower, upper, rectangleCount);
    console.log(rectangleCount)
  }
  return result;
};

exports.erfc = function(x){
  // Complementary Error Function
  return 1 - math.erf(x);
};

exports.igamc = function(a, x){
  // Complemented Incomplete Gamma Function

  var lower_incomplete_gamma = function(s, x){
    //  Calculate the lower incomplete gamma function
    //    ref: https://en.wikipedia.org/wiki/Incomplete_gamma_function
    var f = (t) => Math.pow(t, s - 1) * Math.exp(-t);
    return rectangle_method(f, 0, x);
  };

  var upper_incomplete_gamma = function(s, x){
    // ref: https://en.wikipedia.org/wiki/Incomplete_gamma_function#Properties
    return math.gamma(s) - lower_incomplete_gamma(s, x);
  };

  return upper_incomplete_gamma(a, x) / math.gamma(a);
};
