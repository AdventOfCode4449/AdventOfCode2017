const input = require('fs')
    .readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })
    .split(/\n|\r\n|\r/g)
    .map(v => v.split(''))

let grid = {}
const offset = [(input[0].length - 1) / 2, (input.length - 1) / 2]
for (let r = 0; r < input.length; r++) for (let c = 0; c < input[0].length; c++) {
    grid[[r - offset[0], c - offset[1]]] = input[r][c]
}


// Part 1
let sum1 = 0
let virus1 = {}
virus1.pos = [0, 0]
virus1.dir = [-1, 0]
virus1.burst = function () {
    let infected = grid[virus1.pos] === '#'
    if (!infected) sum1 += 1
    // turn
    let turn = infected ? [[0, 1], [-1, 0]] : [[0, -1], [1, 0]]
    virus1.dir = [
        virus1.dir[0] * turn[0][0] + virus1.dir[1] * turn[0][1],
        virus1.dir[0] * turn[1][0] + virus1.dir[1] * turn[1][1]
    ]
    // infect
    grid[virus1.pos] = (infected ? '.' : '#')
    // move
    virus1.pos = [virus1.pos[0] + virus1.dir[0], virus1.pos[1] + virus1.dir[1]]
}

for (let i = 0; i < 10000; i++) virus1.burst()

console.log('Part 1:', sum1)

// Part 2
let sum2 = 0
grid = {}
for (let r = 0; r < input.length; r++) for (let c = 0; c < input[0].length; c++) {
    grid[[r - offset[0], c - offset[1]]] = input[r][c]
}

let virus2 = {}
virus2.pos = [0, 0]
virus2.dir = [-1, 0]
virus2.burst = function () {
    let turn
    // infect
    switch (grid[virus2.pos]) {
        case '#':
            grid[virus2.pos] = 'f'
            turn = [[0, 1], [-1, 0]]
            break
        case 'w':
            grid[virus2.pos] = '#'
            sum2 += 1
            turn = [[1, 0], [0, 1]]
            break
        case 'f':
            grid[virus2.pos] = '.'
            turn = [[-1, 0], [0, -1]]
            break
        default:
            grid[virus2.pos] = 'w'
            turn = [[0, -1], [1, 0]]
            break
    }
    // turn
    virus2.dir = [
        virus2.dir[0] * turn[0][0] + virus2.dir[1] * turn[0][1],
        virus2.dir[0] * turn[1][0] + virus2.dir[1] * turn[1][1]
    ]
    // move
    virus2.pos = [virus2.pos[0] + virus2.dir[0], virus2.pos[1] + virus2.dir[1]]

}

for (let i = 0; i < 10000000; i++) virus2.burst()

console.log('Part 2:', sum2)
