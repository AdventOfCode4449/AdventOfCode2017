const fs = require('fs')

let data = fs.readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
data = data.split(/\r\n|\r|\n/g)

let pipes = {}
for (let line of data) {
    let match = /^(\d+) <-> (.*)$/.exec(line) // transform input '2 <-> 0, 3, 4'
    pipes[match[1]] = match[2].split(', ') // -> pipes = { '2': ['0', '3', '4'], ... }
}

// programm 'a' is connected to 'b' if it is directly connected or a child of 'a' is connected to 'b'
function isConnected(a, b) {
    // recursive function
    function con(a, b) {
        if (a === b) return true // connected to itself by definition
        if (pipes[a].indexOf(b) > -1) return true // connected to children
        if (c.indexOf(a) > -1) return false // Step out of loop if seen before
        else c.push(a) // memorize for loop

        // now check children recursively
        for (let child of pipes[a]) if (con(child, b)) return true
    }

    let c = [] // Array c as memory to avoid looping
    return con(a, b)
}

// part 1
let count = 0
for (let item of Object.keys(pipes)) {
    if (isConnected('0', item)) count++
}

console.log(count)

// part 2
// loop until every item of the 'pipes'-object is in a group
let groups = []
while (Object.keys(pipes).length > 0) {
    let a = Object.keys(pipes)[0]

    // make group
    groups.push([])
    for (let b of Object.keys(pipes)) {
        if (isConnected(a, b)) groups[groups.length - 1].push(b) // add to last group if connected
    }

    // delete items in group from 'pipe'-object
    for (let item of groups[groups.length - 1]) {
        delete pipes[item]
    }
}

console.log(groups.length)
