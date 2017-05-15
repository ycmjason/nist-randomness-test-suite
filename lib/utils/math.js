var math = require('mathjs');



var romberg_method = exports.romberg_method = function(f, lower, upper){
  var ACCURACY = 0.00000001;
  // ref: https://en.wikipedia.org/wiki/Romberg%27s_method
  var Rp = [];
  var Rc = [];

  var h = (upper-lower); //step size
  Rp[0] = (f(lower) + f(upper)) * h * 1/2; //first trapezoidal step

  for(var i = 1; true; ++i){
    h /= 2.;
    var c = 0;
    var ep = Math.pow(2, i-1);
    for(var j = 1; j <= ep; ++j){
      c += f(lower + (2*j - 1) * h);
    }
    Rc[0] = h*c + Rp[0] * 1/2;

    for(var j = 1; j <= i; ++j){
      var n_k = Math.pow(4, j);
      Rc[j] = (n_k*Rc[j-1] - Rp[j-1])/(n_k-1); //compute R(i,j)
    }

    if(i > 1 && Math.abs(Rp[i-1]-Rc[i]) < ACCURACY){
      return Rc[i-1];
    }

    //swap Rn and Rc as we only need the last row
    temp = Rp;
    Rp = Rc;
    Rc = temp;
  }
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
