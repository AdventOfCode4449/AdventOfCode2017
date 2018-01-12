let letters = []

let tubes = require('fs')
    .readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })
    .split(/\r\n|\r|\n/g)
    .map(v => v.split(''))

let dirR = 1, dirC = 0, row = 0, col = tubes[0].indexOf('|'), run = true, count = 0
while (run) {
    row += dirR; col += dirC
    let val = tubes[row][col]
    count += 1
    switch (val) {
        case ' ':
            run = false; break
        case '+':
            if (dirR) {
                dirR = 0
                dirC = tubes[row][col+1] == ' ' ? -1 : 1   
            } else {
                dirC = 0
                dirR = tubes[row + 1][col] == ' ' ? -1 : 1
            }
            break
        case '-': case'|':
            break
        default:
            letters.push(val); break
    }
}

console.log('Part 1:', letters.join(''))
console.log('Part 2:', count)
