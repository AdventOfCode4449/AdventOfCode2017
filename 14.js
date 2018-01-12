function knotHash(str) {
    let lengths = [...str.split('').map(v => v.charCodeAt(0)), 17, 31, 73, 47, 23]

    let list = [...Array(256)].map((v, i) => i)
    list.pos = 0
    list.skip = 0
    list.index = function (i) { return i < this.length ? i : i % this.length }
    list.twist = function (length) {
        let rev = []
        for (let i = 0; i < length; i++) rev.push(this[this.index(i + this.pos)])
        rev = rev.reverse()
        for (let i = 0; i < length; i++) this[this.index(i + this.pos)] = rev[i]
        this.pos = this.index(this.pos + length + this.skip)
        this.skip += 1
    }

    for (let i = 0; i < 64; i++) for (let length of lengths) list.twist(length)

    let denseHash = []
    for (let i = 0; i < 16; i++) {
        denseHash.push(list.splice(0, 16).reduce((prev, curr) => prev ^ curr))
    }
    let knotHash = denseHash.map(v => (v < 16 ? '0' : '') + v.toString(16))

    return knotHash.join('')
}

function hex2bin(str) {
    let bin = '0000' + parseInt(str, 16).toString(2)
    return bin.substring(bin.length - 4, bin.length)
}

let input = require('fs').readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })

// part 1
let matrix = []
for (let i = 0; i < 128; i++) matrix.push(knotHash(input + '-' + i)
    .split('')
    .map(hex2bin).join('')
    .replace(/1/g, '#')
    .split(''))

let sum = 0
for (let line of matrix) sum += line.join('').replace(/0/g, '').length

console.log('Part 1:', sum)

// part 2
matrix.makeArea = function (row, col, n) {
    if (this[row][col] === '#') {
        this[row][col] = n
        row = parseInt(row), col = parseInt(col)
        if (col > 0) this.makeArea(row, col-1, n)
        if (col < 127) this.makeArea(row, col+1, n)
        if (row > 0) this.makeArea(row-1, col, n)
        if (row < 127) this.makeArea(row+1, col, n)
    }
}

let i = 1
for (let row in matrix) for (let col in matrix[row]) if(matrix[row][col] === '#') matrix.makeArea(row, col, i++)

for(let line of matrix) console.log(line.join(''))

console.log('Part 2:', i-1)