const buffer = [0]
buffer.pos = 0
buffer.move = function (steps) {
    let next = this[this.pos] + 1
    this.pos += steps
    this.pos %= this.length
    this.splice(++this.pos, 0, next)
}

const input = 303

for (let i = 1; i <= 2017; i++) buffer.move(input)

const answer1 = buffer[(buffer.pos + 1) % (buffer.length - 1)]

console.log('Part 1:', answer1)

let pos = 0
let answer2
let bool = false
for (let i = 1; i <= 50000000; i++) {
    pos = (pos + input) % i
    if (pos === 0) answer2 = i
    pos++
}

console.log(answer2)