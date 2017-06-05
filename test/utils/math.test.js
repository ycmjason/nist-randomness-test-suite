process.env.NODE_ENV = 'test';

var assert = require('assert');

var math = require('../../lib/utils/math');

describe('utils/math', function(){
  it('# romberg_method', function(){
    var EXPECTED_ACCURACY = 0.00000001;

    var method = 'romberg_method';
    var tests = [
      [[(x) => Math.pow(x, 2) + 1, 0, 2], 14/3],
      [[(y) => Math.pow(y, 2) + Math.pow(y, -2), 1, 2], 17/6],
      [[(x) => 2 * Math.sin(x) - 5 * Math.cos(x), 0, Math.PI / 3], 1 - (5 * Math.pow(3, 1/2) / 2)],
      [[(x) => 2 * Math.sin(x) - 5 * Math.cos(x), 0, Math.PI / 3], 1 - (5 * Math.pow(3, 1/2) / 2)],
    ];
    tests.forEach(([input, result]) => assert(Math.abs(math[method].apply(null, input) - result) <= EXPECTED_ACCURACY));
  });

  it('# Complementary Error Function (erfc)', function(){
    var EXPECTED_ACCURACY = 0.0001;
    // the values are taken from: https://uk.mathworks.com/help/matlab/ref/erfc.html
    var method = 'erfc';
    var tests = [
        [[0.35], 0.6206],
        [[-0.5], 1.5205],
        [[0], 1],
        [[1], 0.1573],
        [[0.72], 0.3086],
    ];
    tests.forEach(([input, result]) => assert(Math.abs(math[method].apply(null, input) - result) <= EXPECTED_ACCURACY));
  });

  it('# Complemented Incomplete Gamma Function (igamc)', function(){
    var EXPECTED_ACCURACY = 0.0001;
    var method = 'igamc';
    var tests = [
        [[2, 1], 0.73576],
        [[5, 3], 0.81526],
        [[2, 10], 4.9940e-04],
    ];
    tests.forEach(([input, result]) => assert(Math.abs(math[method].apply(null, input) - result) <= EXPECTED_ACCURACY));
  });

  describe('Matrix', function(){
    it('# swapRows(i, j)', function(){
      var m = new math.Matrix([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ]);
      assert.deepEqual(m.swapRows(1, 2), new math.Matrix([
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ]))
    });
    it('# rank()', function(){
      var m = new math.Matrix([
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 0],
      ]);
      assert.equal(m.rank(), 4);
      var m = new math.Matrix([
        [1, 2, -1, -4],
        [2, 3, -1, -11],
        [-2, 0, -3, 22]
      ]);
      assert.equal(m.rank(), 3);
      m = new math.Matrix([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ]);
      assert.equal(m.rank(), 2);
      m = new math.Matrix([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 1],
      ]);
      assert.equal(m.rank(), 3);
    });
  });
});
