process.env.NODE_ENV = 'test';

var assert = require('assert');

var TestSuit = require('../lib/index');
var testNames = TestSuit.testNames;

var range = require('../lib/utils/range');

const NUMBER_OF_BIT = Math.pow(10, 5);

var perfect_generator = () => Math.round(Math.random());
var zero_biased_generator = () => Math.random() > 0.65? 1: 0;
var faulty_generator = () => 0;

var perfect_bits = range(NUMBER_OF_BIT).map(perfect_generator);
var zero_biased_bits = range(NUMBER_OF_BIT).map(zero_biased_generator);
var faulty_bits = range(NUMBER_OF_BIT).map(faulty_generator);

describe('NIST test suite', function(){
  // allow 10s to complete the test
  this.timeout(10000);

  testNames.forEach(name => {
    describe(name, function(){
      var skip;
      var testSuit = new TestSuit(0.001);

      skip = [];
      if(skip.indexOf(name) == -1){
        it('# perfect generator should pass', function(){
          assert(testSuit[name](perfect_generator));
        });
        it('# perfect bits array should pass', function(){
          assert(testSuit[name](perfect_bits));
        });
        it('# perfect bits should pass', function(){
          assert(testSuit[name](perfect_bits.join('')));
        });
      }

      skip = ['nonOverlappingTemplateMatchingTest'];
      if(skip.indexOf(name) == -1){
        it('# zero biased generator should fail', function(){
          assert(!testSuit[name](zero_biased_generator));
        });
        it('# zero biased bits array should fail', function(){
          assert(!testSuit[name](zero_biased_bits));
        });
        it('# zero biased bits should fail', function(){
          assert(!testSuit[name](zero_biased_bits.join('')));
        });
      }

      skip = ['nonOverlappingTemplateMatchingTest'];
      if(skip.indexOf(name) == -1){
        it('# faulty generator should fail', function(){
          assert(!testSuit[name](faulty_generator));
        });
        it('# faulty bits array should fail', function(){
          assert(!testSuit[name](faulty_bits));
        });
        it('# faulty bits should fail', function(){
          assert(!testSuit[name](faulty_bits.join('')));
        });
      }
    });
  });
});
