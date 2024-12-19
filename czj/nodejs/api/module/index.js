const path = require('path');
let moduleA = require('./a');
console.log(moduleA, require.resolve('./a'), require.resolve.paths('./a'))
moduleA = 2;
// moduleA.sum = 2;
// console.log(moduleA, require.main === module)
// console.log(require.main.filename, __filename, __dirname)

let moduleA_copy = require('./a');
console.log(moduleA_copy, moduleA, moduleA === moduleA_copy)

let moduleB = require('./b');
console.log(moduleB)
// console.log(module.children)

// console.log(__dirname, path.dirname(__filename));
// console.log(require.cache)