let data = require('fs')
    .readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })
    .split('')
    .map(v => parseInt(v))

// part 1
let val1 = 0
for (let i = 0; i < data.length; i++) {
    if (data[i] === data[(i + 1) % data.length]) val1 += data[i]
}

console.log(val1)

// part 2
let val2 = 0
for (let i = 0; i < data.length; i++) {
    if (data[i] === data[(i + data.length / 2) % data.length]) val2 += data[i]
}

console.log(val2)