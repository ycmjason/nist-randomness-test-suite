var math = require('mathjs');

// let this module extends from mathjs
Object.assign(exports, math, {
  BinaryMatrix: require('./BinaryMatrix')
});

var romberg_method = exports.romberg_method = function(f, lower, upper){
  var ACCURACY = 0.00000000000001;
  // ref: https://en.wikipedia.org/wiki/Romberg%27s_method
  var R = [];

  var h = (upper-lower); //step size
  // R(0, 0)
  R[0] = [(f(lower) + f(upper)) * h * 1/2]; //first trapezoidal step

  var n = 0;
  do{
    n += 1;
    R[n] = [];
    h /= 2;

    // calculation of R(n, 0)
    var c = 0;
    for(var k = 1; k <= Math.pow(2, n-1); ++k){
      c += f(lower + (2*k - 1) * h);
    }
    R[n][0] = h*c + R[n-1][0] * 1/2;

    // calculation of R(n, m)
    for(var m = 1; m <= n; ++m){
      R[n][m] = (Math.pow(4, m)*R[n][m-1] - R[n-1][m-1])/(Math.pow(4, m)-1);
    }

  }while(Math.abs(R[n-1][n-1]-R[n][n]) > ACCURACY);

  return R[n][n];
}

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
    return romberg_method(f, 0, x);
  };

  var upper_incomplete_gamma = function(s, x){
    // ref: https://en.wikipedia.org/wiki/Incomplete_gamma_function#Properties
    return math.gamma(s) - lower_incomplete_gamma(s, x);
  };

  return upper_incomplete_gamma(a, x) / math.gamma(a);
};
