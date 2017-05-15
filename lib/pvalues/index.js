var testNames = require('../testNames');

testNames.forEach(name => exports[name] = require(`./${name}Test`));
