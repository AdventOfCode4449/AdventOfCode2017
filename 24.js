const parts = require('fs')
    .readFileSync('24.txt', { encoding: 'utf8' })
    .split(/\n|\r\n|\r/g)
    .map(v => v.split(/\//g).map(v => parseInt(v)))

Array.prototype.copy = function () { return this.map(v => v.map(v => v)) }

function buildBridges(parts) {
    function build(bridge, remainingParts) {
        let pin = (bridge.length == 0 ? 0 : bridge[bridge.length - 1][1])
        let parts = remainingParts.copy()
        let match = false
        for (let i = 0; i < parts.length; i++) {
            if (pin === parts[i][0] || pin === parts[i].reverse()[0]) {
                match = true
                let nextBridge = bridge.copy()
                let nextParts = parts.copy()
                nextBridge.push(...nextParts.splice(i, 1))
                build(nextBridge, nextParts)
            }
        }
        if (!match) bridges.push(bridge)
    }

    let bridges = []
    build([], parts)
    return bridges
}

let bridges = buildBridges(parts)
let strengths = bridges.map(bridge => bridge
    .map(part => part[0] + part[1])
    .reduce((p, c) => p + c, 0)
)
let maxStrength = strengths.reduce((p, c) => Math.max(p, c), 0)

let lengths = bridges.map(bridge => bridge.length)
let maxLength = lengths.reduce((p, c) => Math.max(p, c))

let maxLengthAndStrength = 0
for (let i = 0; i < bridges.length; i++)
    if (lengths[i] === maxLength && strengths[i] > maxLengthAndStrength)
        maxLengthAndStrength = strengths[i]

console.log('Part 1:', maxStrength)
console.log('Part 2:', maxLengthAndStrength)
