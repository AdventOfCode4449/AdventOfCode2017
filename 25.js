
let tape = new Proxy({}, {
    get: function (target, prop) {
        if (prop in target) return target[prop]
        else return 0
    },
    set: function (target, prop, value) {
        if (value === 0) {
            delete target[prop]
            return 0
        } else return target[prop] = value
    }
})

let state = 'A'
let inState = (stateString) => stateString.includes(state)
let setState = (toString) => state = toString['ABCDEF'.indexOf(state)]
let pos = 0
for (let i = 0; i < 12386363; i++) {
    if (tape[pos] === 0) {
        tape[pos] = 1
        pos += (inState('A') ? 1 : -1)
        setState('BCDEAE')
    } else {
        tape[pos] = (inState('EF') ? 1 : 0)
        pos += (inState('BCF') ? 1 : -1)
        setState('EACFCA')
    }
}

let checkSum = Reflect.ownKeys(tape).length
console.log('Part 1:', checkSum)
