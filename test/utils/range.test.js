process.env.NODE_ENV = 'test';

var assert = require('assert');

var range = require('../../lib/utils/range');

describe('utils/range', function(){
  it('# range(stop)', function(){
    assert.deepEqual(range(5), [0, 1, 2, 3, 4]);
  });

  it('# range(start, stop)', function(){
    assert.deepEqual(range(3, 6), [3, 4, 5]);
    assert.deepEqual(range(3, 7), [3, 4, 5, 6]);
  });

  it('# range(start, stop, step)', function(){
    assert.deepEqual(range(3, 6, 2), [3, 5]);
    assert.deepEqual(range(3, 7, 2), [3, 5]);
    assert.deepEqual(range(4, 9, 2), [4, 6, 8]);
  });
});
