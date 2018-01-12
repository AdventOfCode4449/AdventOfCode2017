const fs = require('fs')

let data = fs.readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
let banks = data.split(/\s+/).map(v => parseInt(v))


let states = [], state = ''

while (states.indexOf(state = banks.join(';')) === -1) {
    states.push(state)
    let blocks = Math.max(...banks)
    let index = banks.indexOf(blocks)
    banks[index] = 0
    while (blocks > 0) {
        index = (index < banks.length - 1) ? index + 1 : 0
        banks[index] += 1
        blocks -= 1
    }
}

console.log(states.length)
let startLoopIndex = states.indexOf(state)
console.log(states.length - startLoopIndex)
