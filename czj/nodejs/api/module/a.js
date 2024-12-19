let sum = 1;

function multiply(a, b) {
  return a * b;
}

// exports.add = (a, b) => a + b;
// exports.subtract = (a, b) => a - b;
module.exports.aa = 99;
//exports.sum = sum;
// module.exports = multiply;
console.log(sum, exports.sum, module.filename, module.id, module.loaded);
console.log(module.parent, module.paths);
//module.exports = sum;