const fs = require('fs');

fs.readFile('../examples/communicate/web.html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(data.toString())
})

// fs.open('./a.txt', (err, fd) => {
//   console.log(err, fd)
// })

console.log('last line');