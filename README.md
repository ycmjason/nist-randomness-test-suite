# NIST randomness test suite

[![Build Status](https://travis-ci.org/ycmjason/nist-randomness-test-suite.svg?branch=master)](https://travis-ci.org/ycmjason/nist-randomness-test-suite)

This is an npm module which provides a subset of tests documented in the [Statistical Test Suite for Random and Pseudorandom Number Generators for Cryptographic Applications](http://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-22r1a.pdf).

## Implemented tests
| Test                                   | Reference in NIST Test Suite |
| ------------------------------------   | ---------------------------- |
| Frequency test                         | 2-2                          |
| Runs test                              | 2-5                          |
| Binary Matrix Rank Test                | 2-10                         |
| Non-overlapping Template Matching test | 2-14                         |

## Install
```
npm install --save-dev nist-randomness-test-suite
```

## Usage
```javascript
var TestSuit = require('nist-randomness-test-suite');

var alpha = 0.001;

var testSuite = new TestSuit(alpha);

// you can also pass in a PRNG/RNG and the testsuite would generate 10^5 bits to test
var generator = () => Math.round(Math.random());
testSuite.frequencyTest(generator);
testSuite.runsTest(generator);
testSuite.binaryMatrixRankTest(generator);
testSuite.nonOverlappingTemplateMatchingTest(generator);

// you can pass in a bit string to test its randomness
var bitString = "10101001101";
testSuite.frequencyTest(bitString);
testSuite.runsTest(bitString);
testSuite.binaryMatrixRankTest(bitString);
testSuite.nonOverlappingTemplateMatchingTest(bitString);

// alternatively, you could pass in an array of bits
var bits = [0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0];
testSuite.frequencyTest(bits);
testSuite.runsTest(bits);
testSuite.binaryMatrixRankTest(bits);
testSuite.nonOverlappingTemplateMatchingTest(bits);
```

## Recommended size of input (by the NIST test suite)

### Alpha
Alpha should be of range [0.001, 0.01]. An alpha of 0.01 indicates that one would expect 1 sequence in 100 sequences would be rejected. 

### Length of the bits
You would want to have a 10^4 to 10^7 long bits to obtain a meaningful result. 

## Test
```
npm test
```

## Author
Jason Yu
