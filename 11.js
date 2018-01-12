let path = require('fs').readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' }).split(',')

let pos = [0, 0]
pos.add = function (x, y) {
    this[0] += x
    this[1] += y
}

let maxDistance = 0
for (let step of path) {
    switch (step) {
        case 'n': pos.add(0, 1); break
        case 's': pos.add(0, -1); break
        case 'ne': pos.add(1, (pos[0] % 2 == 0) ? 0 : 1); break
        case 'se': pos.add(1, (pos[0] % 2 == 0) ? -1 : 0); break
        case 'nw': pos.add(-1, (pos[0] % 2 == 0) ? 0 : 1); break
        case 'sw': pos.add(-1, (pos[0] % 2 == 0) ? -1 : 0); break
    }
    maxDistance = Math.max(maxDistance, distanceTo0())
}

function distanceTo0(){
    let { abs, ceil, floor } = Math
    let [x, y] = pos
    let round = y > 0 ? ceil : floor
    y = round(abs(y) - abs(x) / 2)
    x = abs(x)
    let distance = x + y
    return distance
}

console.log('part1:', distanceTo0())
console.log('part2:', maxDistance)
