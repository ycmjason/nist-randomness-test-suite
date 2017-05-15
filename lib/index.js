var pvalues = require('./pvalues');
var testNames = require('./testNames');

var DEFAULT_NUMBER_OF_BIT = 100;

var errors = require('./errors');

var testCaseFactory = (name, pvalueFunc, alpha) => {
  return function(testSubject){
    if(typeof testSubject === "function"){
      // then the test subject is a random bit generator
      let generator = testSubject;
      testSubject = new Array(DEFAULT_NUMBER_OF_BIT).fill(undefined).map(generator);
    }else if(typeof testSubject === "string"){
      // then the test subject is a random bit sequence itself
      testSubject = testSubject.slice('');
    }else if(!(testSubject instanceof Array)){
      // then the given testSubject is not supported
      throw errors.InvalidTypeError;
    }

    // now the testSubject should be an array of bits
    let bits = testSubject.map((v) => v.toString());
    // make sure everything in `bits` is either '1' or '0'
    if(bits.filter((b) => b !== '1' && b !== '0').length > 0) throw errors.InvalidBitError;

    return pvalueFunc(bits) >= alpha;
  }
}

function TestSuite(significant_level){
  significant_level = significant_level || 0.005;

  testNames.forEach(name => this[name+'Test'] = testCaseFactory(name, pvalues[name], significant_level));
}

module.exports = TestSuite;
