process.env.NODE_ENV = 'test';

var assert = require('assert');

var TestSuit = require('../lib/index');
var testNames = require('../lib/testNames');

var range = require('../lib/utils/range');

var perfect_generator = () => Math.round(Math.random());
var zero_biased_generator = () => Math.random() > 0.65? 1: 0;
var faulty_generator = () => 0;

describe('NIST test suite', function(){
  // allow 10s to complete the test
  this.timeout(10000);

  testNames.forEach(name => {
    describe(name + ' test', function(){
      var skip;
      var testSuit = new TestSuit(0.001);

      skip = [];
      if(skip.indexOf(name) == -1){
        it('# perfect generator should pass', function(){
          assert(testSuit[name + 'Test'](perfect_generator));
        });
      }

      skip = ['nonOverlappingTemplateMatching'];
      if(skip.indexOf(name) == -1){
        it('# zero biased generator should fail', function(){
          assert(!testSuit[name + 'Test'](zero_biased_generator));
        });
      }

      skip = ['nonOverlappingTemplateMatching'];
      if(skip.indexOf(name) == -1){
        it('# faulty generator should fail', function(){
          assert(!testSuit[name + 'Test'](faulty_generator));
        });
      }
    });
  });
});
