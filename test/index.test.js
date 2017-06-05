process.env.NODE_ENV = 'test';

var assert = require('assert');

var TestSuite = require('../lib/index');
var range = require('../lib/utils/range');

const NUMBER_OF_BIT = Math.pow(10, 5);

getTestSubjects = (generator) => {
  var bitsArray = range(NUMBER_OF_BIT).map(generator);
  return {
    "generator": generator,
    "bit array": bitsArray,
    "bit string": bitsArray.join('')
  };
};

var generators = [
  {
    name: "perfect generator",
    next: () => Math.round(Math.random()),
    expect: "pass",
    skip: []
  },
  {
    name: "zero biased generator",
    next: () => Math.random() > 0.65? 1: 0,
    expect: "fail",
    skip: ['nonOverlappingTemplateMatchingTest', 'binaryMatrixRankTest']
  },
  {
    name: "faulty generator",
    next: () => 0,
    expect: "fail",
    skip: ['nonOverlappingTemplateMatchingTest']
  },
];

describe('NIST test suite', function(){
  // allow 10s to complete the test
  this.timeout(10000);

  var testSuite = new TestSuite(0.001);

  // tests using generator
  generators.forEach(generator => {
    describe(generator.name, function(){
      TestSuite.testNames.forEach(testName => {
        if(generator.skip.includes(testName)) return;

        it(`# ${generator.name} should ${generator.expect} ${testName}`, function(){
          if(generator.expect === "pass") assert(testSuite[testName](generator.next));
          else assert(!testSuite[testName](generator.next));
        });

      });
    });
  });

  // tests using bit array
  generators.forEach(generator => {
    describe(generator.name, function(){
      TestSuite.testNames.forEach(testName => {
        if(generator.skip.includes(testName)) return;

        it(`# bit array generated from ${generator.name} should ${generator.expect} ${testName}`, function(){
          var bit_arr = range(NUMBER_OF_BIT).map(generator.next);

          if(generator.expect === "pass") assert(testSuite[testName](bit_arr));
          else assert(!testSuite[testName](bit_arr));
        });

      });
    });
  });

  // tests using bit string
  generators.forEach(generator => {
    describe(generator.name, function(){
      TestSuite.testNames.forEach(testName => {
        if(generator.skip.includes(testName)) return;

        it(`# bit array generated from ${generator.name} should ${generator.expect} ${testName}`, function(){
          var bit_string = range(NUMBER_OF_BIT).map(generator.next).join('');

          if(generator.expect === "pass") assert(testSuite[testName](bit_string));
          else assert(!testSuite[testName](bit_string));
        });

      });
    });
  });
});
