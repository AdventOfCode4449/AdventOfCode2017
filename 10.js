let lengths = require('fs')
    .readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })
    .split(',')
    .map(v => parseInt(v))

let list = [...Array(256)].map((v, i) => i) // [0, 1, 2, ..., 255]
list.pos = 0
list.skip = 0
list.index = function (i) { return i < this.length ? i : i % this.length }
list.twist = function (length) {
    let rev = []
    for (let i = 0; i < length; i++)
        rev.push(this[this.index(i + this.pos)])
    rev = rev.reverse()
    for (let i = 0; i < length; i++)
        this[this.index(i + this.pos)] = rev[i]
    this.pos = this.index(this.pos + length + this.skip)
    this.skip += 1
}

for (let length of lengths) {
    list.twist(length)
}

console.log('part1:', list[0] * list[1])

// part 2
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

console.log(knotHash(require('fs').readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })))

module.exports = { knotHash: knotHash}