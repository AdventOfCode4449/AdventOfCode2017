const input = require('fs')
    .readFileSync('23.txt', { encoding: 'utf8' })
    .split(/\n|\r\n/g)
    .map(line => line.split(/\s/g))

// Part 1
let regs = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0 }
let mulCount = 0

for (let i = 0; i < input.length; i++) {
    let command = input[i][0]
    let arg1 = (!isNaN(input[i][1]) ? parseInt(input[i][1]) : input[i][1])
    let arg2 = (!isNaN(input[i][2]) ? parseInt(input[i][2]) : regs[input[i][2]])

    switch (command) {
        case 'set': regs[arg1] = arg2; break
        case 'sub': regs[arg1] -= arg2; break
        case 'mul': regs[arg1] *= arg2; mulCount++; break
        case 'jnz': if ((typeof arg1 === 'string' ? regs[arg1] : arg1) !== 0) i += arg2 - 1; break
    }
}

console.log('Part 1:', mulCount)

// Part 2
// rewritten input manually.
let h = 0
for (let b = 108100; b <= 125100; b += 17) {
    //find prime numbers...
    for (let d = 2; d < b / 2; d++) {
        if (b % d === 0) {
            h += 1
            break
        }
    }
}

console.log('Part 2:', h)