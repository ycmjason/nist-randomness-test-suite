process.env.NODE_ENV = 'test';

var assert = require('assert');

var TestSuit = require('../lib/index');

var perfect_generator = () => Math.round(Math.random());
var zero_biased_generator = () => Math.random() > 0.7? 1: 0;
var faulty_generator = () => 0;

describe('NIST test suite', function(){
  describe('frequency test', function(){
    it('# perfect generator should pass', function(){
      var testSuit = new TestSuit(0.001);
      assert(testSuit.frequencyTest(perfect_generator));
    });
    it('zero biased generator should fail', function(){
      var testSuit = new TestSuit(0.001);
      assert(!testSuit.frequencyTest(zero_biased_generator));
    });
    it('faulty generator should fail', function(){
      var testSuit = new TestSuit(0.001);
      assert(!testSuit.frequencyTest(faulty_generator));
    });
  });
});
