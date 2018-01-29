let commands = require('fs').readFileSync('8.txt', { encoding: 'utf8' }).split(/\r?\n/g).map(line => line.split(/\s/g))

let registers = new Proxy({}, {
    get: function (target, key) {
        if (!isNaN(key)) return parseInt(key)
        else return parseInt(target[key]) || 0
    }
})

let func = {
    'inc': function (prop, value) { registers[prop] += registers[value] },
    'dec': function (prop, value) { registers[prop] -= registers[value] },
    '==': function (a, b) { return registers[a] === registers[b] },
    '<=': function (a, b) { return registers[a] <= registers[b] },
    '>=': function (a, b) { return registers[a] >= registers[b] },
    '<': function (a, b) { return registers[a] < registers[b] },
    '>': function (a, b) { return registers[a] > registers[b] },
    '!=': function (a, b) { return registers[a] !== registers[b] }
}

// issue commands
let maxDuringOperations = 0
for (let c of commands) {
    if (func[c[5]](c[4], c[6])) func[c[1]](c[0], c[2])
    maxDuringOperations = Math.max(maxDuringOperations, registers[c[0]])
}

// find max value in registers
let maxAfterOperations = 0
for (let key of Object.keys(registers)) {
    maxAfterOperations = Math.max(maxAfterOperations, registers[key])
}

console.log('Part 1:', maxAfterOperations)
console.log('Part 2:', maxDuringOperations)