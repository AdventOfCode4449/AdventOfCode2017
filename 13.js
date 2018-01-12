let layers = [] // container for layers

let data = require('fs') // load input
    .readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
    .split(/\r\n|\r|\n/g)

for (let line of data) { // fill container
    let match = /(\d+):\s(\d+)$/.exec(line) // '1: 2'
    layers[match[1]] = parseInt(match[2])
}

function collision(range, time) {
    time = time % (2 * (range - 1))
    if (time <= (range - 1)) return time === 0
    else return 2 * (range - 1) - time === 0
}

// Part 1
let severity = (function () {
    let severity = 0
    for (let i in layers) {
        severity += collision(layers[i], i) * i * layers[i]
    }
    return severity
})()

console.log('part1:', severity)

// Part 2
let minDelayToPass = (function () {
    let delay = 0
    while (true) {
        for (let i in layers) {
            if (collision(layers[i], parseInt(i) + delay)) break
            else if (i == layers.length - 1) return delay
        }
        delay += 1
    }
})()

console.log('part2:', minDelayToPass)