const fs = require('fs')

let data = fs.readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
let maze = data.split(/\r\n|\r|\n/).map(v => parseInt(v))

// part 1
let i = 0, count = 0
while (i < maze.length && i >= 0) {
    i += maze[i]++
    count++
}

console.log(count)

// part 2
i = 0
count = 0
maze = data.split(/\r\n|\r|\n/).map(v => parseInt(v))
let jump = 0
while (i < maze.length && i >= 0) {
    jump = maze[i]
    maze[i] += jump > 2 ? -1 : 1
    i += jump
    count++
}

console.log(count)