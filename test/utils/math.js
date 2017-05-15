process.env.NODE_ENV = 'test';

var assert = require('assert');

var math = require('../../lib/utils/math');

describe('utils/math', function(){
  describe('SigFigConsistancy', function(){
    it('# isConsistant negative', function(){
      var sfc = new math.SigFigConsistancy(5)
      var inconsistant_data = [1.2, 12, 1.3, 13, 1.4, 14, 2, 5, 7, 7.2345];
      inconsistant_data.forEach((v) => assert(!sfc.isConsistant(v)));
    });
    it('# isConsistant positive', function(){
      var sfc = new math.SigFigConsistancy(5)
      var consistant_data = [7.2345038, 7.234499, 7.234500, 7.234501];
      assert(!sfc.isConsistant(7.2345022));
      consistant_data.forEach((v) => assert(sfc.isConsistant(v)));
    });
  });

  it('# rectangle_method', function(){
    var method = 'rectangle_method';
    var tests = [
      [[(x) => Math.pow(x, 2) + 1, 0, 2], 14/3],
      [[(y) => Math.pow(y, 2) + Math.pow(y, -2), 1, 2], 17/6],
      [[(x) => 2 * Math.sin(x) - 5 * Math.cos(x), 0, Math.PI / 3], 1 - (5 * Math.pow(3, 1/2) / 2)],
      [[(x) => 2 * Math.sin(x) - 5 * Math.cos(x), 0, Math.PI / 3], 1 - (5 * Math.pow(3, 1/2) / 2)],
    ];
    tests.forEach(([input, result]) => assert.equal(math[method].apply(null, input).toPrecision(4), result.toPrecision(4)));
  });

  it('# Complementary Error Function (erfc)', function(){
    // the values are taken from: https://uk.mathworks.com/help/matlab/ref/erfc.html
    var method = 'erfc';
    var tests = [
        [[0.35], 0.6206],
        [[-0.5], 1.5205],
        [[0], 1],
        [[1], 0.1573],
        [[0.72], 0.3086],
    ];
    tests.forEach(([input, result]) => assert.equal(math[method].apply(null, input).toPrecision(4), result.toPrecision(4)));
  });

  it('# Complemented Incomplete Gamma Function (igamc)', function(){
    var method = 'igamc';
    var tests = [
        [[2, 1], 0.73576],
        [[5, 3], 0.81526],
        [[2, 10], 4.9940e-04],
    ];
    tests.forEach(([input, result]) => assert.equal(math[method].apply(null, input).toPrecision(4), result.toPrecision(4)));
  });
});
