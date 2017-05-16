process.env.NODE_ENV = 'test';

var assert = require('assert');

var TestSuit = require('../lib/index');
var testNames = require('../lib/testNames');

var range = require('../lib/utils/range');

var perfect_generator = () => Math.round(Math.random());
var zero_biased_generator = () => Math.random() > 0.65? 1: 0;
var faulty_generator = () => 0;

var NUMBER_OF_TRIAL = 100;
var TOLERANCE = 2; // allow how many fail out of `NUMBER_OF_TRIAL`

function tolerable(testResults, tolerance){
  var numberOfFail = testResults.filter((r) => r === false).length;
  return numberOfFail <= tolerance;
}

describe('NIST test suite', function(){
  testNames.forEach(name => {
    describe(name + ' test', function(){
      it('# perfect generator should pass', function(){
        var testSuit = new TestSuit(0.001);
        var testResults = range(NUMBER_OF_TRIAL).map(() => testSuit[name + 'Test'](perfect_generator));
        assert(tolerable(testResults, TOLERANCE));
      });

      it('# zero biased generator should fail', function(){
        var testSuit = new TestSuit(0.001);
        var testResults = range(NUMBER_OF_TRIAL).map(() => testSuit[name + 'Test'](zero_biased_generator));
        assert(!tolerable(testResults, TOLERANCE));
      });

      it('# faulty generator should fail', function(){
        var testSuit = new TestSuit(0.001);
        var testResults = range(NUMBER_OF_TRIAL).map(() => testSuit[name + 'Test'](faulty_generator));
        assert(!tolerable(testResults, TOLERANCE));
      });
    });
  });
});
