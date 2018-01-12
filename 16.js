const input = require('fs')
    .readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
    .split(',')


// Part 1
const dance = Object.create(null)
dance.list = [...Array(16)].map((v, i) => 'abcdefghijklmnop'[i]) // ['a', 'b', 'c', ..., 'p']
dance.s = function (count) {
    this.list = [
        ...this.list.slice(this.list.length - count, this.list.length),
        ...this.list.slice(0, this.list.length - count)
    ]
}
dance.x = function (i, k) {
    [this.list[i], this.list[k]] = [this.list[k], this.list[i]]
}
dance.p = function (a, b) {
    this.x(this.list.indexOf(a), this.list.indexOf(b))
}

for (let move of input) {
    let match = /^(\w)(\w+)(?:\/)?(\w+)?$/.exec(move)
    dance[match[1]](match[2], match[3])
}

console.log('Part 1:', dance.list.join(''))

// Part 2
dance.list = [...Array(16)].map((v, i) => 'abcdefghijklmnop'[i])

let seenBefore = []
for (let i = 0; i < 1e9; i++) {
    seenBefore.push(dance.list.join(''))
    for (let move of input) {
        let match = /^(\w)(\w+)(?:\/)?(\w+)?$/.exec(move)
        dance[match[1]](match[2], match[3])
    }
    if (seenBefore.indexOf(dance.list.join('')) !== -1) break
}

console.log('Part 2:', seenBefore[1e9 % seenBefore.length])