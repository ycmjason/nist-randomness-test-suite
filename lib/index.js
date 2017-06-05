var pvalues = require('./pvalues');
var testNames = require('./testNames');
var range = require('./utils/range');

// the default number of bits is recommended by the NIST test suite: Page. 2-2
// QUOTE: 
//    For many of the tests in this test suite, the assumption has been made
//    that the size of the sequence length, n, is large (of the order 10^3 to 10^7). 
var DEFAULT_NUMBER_OF_BIT = Math.pow(10, 5);

var errors = require('./errors');

// bit array is simply an array with only 1s and 0s in it.
var isBitArray = (bits) => {
  return bits.filter((b) => b !== 1 && b !== 0).length > 0;
};

var testCaseFactory = (name, pvalueFunc, alpha) => {
  return function(testSubject){
    if(typeof testSubject === "function"){
      // then the test subject is a random bit generator
      let generator = testSubject;
      testSubject = range(DEFAULT_NUMBER_OF_BIT).map(generator);
    }else if(typeof testSubject === "string"){
      // then the test subject is a random bit sequence itself
      testSubject = testSubject.split('');
    }else if(!Array.isArray(testSubject)){ // this also allow Array to be the input type
      // then the given testSubject is not supported
      throw errors.InvalidTypeError;
    }

    // now the testSubject should be an array of bits
    let bits = testSubject.map((v) => Number.parseInt(v));
    // make sure everything in `bits` is either '1' or '0'
    if(isBitArray(bits)) throw errors.InvalidBitError;

    return pvalueFunc(bits) >= alpha;
  }
}

function TestSuite(significant_level){
  significant_level = significant_level || 0.005;

  testNames.forEach(name => {
    this[name+'Test'] = testCaseFactory(name, pvalues[name], significant_level)
  });
}

TestSuite.testNames = testNames.map(name => name + 'Test');

module.exports = TestSuite;
