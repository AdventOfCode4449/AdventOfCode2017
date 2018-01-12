const Picture = function (size) {
    this.size = size
}

Picture.parse = function (stackedArray) {
    let check = stackedArray
    if (typeof stackedArray === 'string')
        stackedArray = stackedArray.split(/\n|\//g).map(str => str.split(''))
    let parsed = new Picture(stackedArray.length)
    for (let row = 0; row < stackedArray.length; row += 1)
        for (let col = 0; col < stackedArray[row].length; col += 1) {
            parsed[`${row},${col}`] = stackedArray[row][col]
        }
    return parsed
}

Picture.prototype.toString = function (del = '\n') {
    let str = ''
    for (let row = 0; row < this.size; row += 1) {
        for (let col = 0; col < this.size; col += 1) {
            str += this[`${row},${col}`]
        }
        if (row < this.size - 1) str += del
    }
    return str
}

Picture.prototype.join = function (del = '/') { return this.toString(del) }

Picture.prototype.slice = function (start = [0, 0], end = [this.size, this.size]) {
    if (end[0] - start[0] !== end[1] - start[1]) throw new Error('Wrong dimension')

    let sliced = new Picture([end[0] - start[0]])
    for (let row = start[0]; row < end[0]; row += 1) for (let col = start[1]; col < end[1]; col += 1)
        sliced[`${row - start[0]},${col - start[1]}`] = this[`${row},${col}`]
    return sliced
}

Picture.prototype.flip = function () {
    let flipped = new Picture(this.size)
    for (let row = 0; row < this.size; row += 1)
        for (let col = 0; col < this.size; col += 1)
            flipped[`${row},${col}`] = this[`${row},${this.size - col - 1}`]
    return flipped
}

Picture.prototype.rotate = function () {
    let rotated = new Picture(this.size)
    for (let row = 0; row < this.size; row += 1)
        for (let col = 0; col < this.size; col += 1)
            rotated[`${row},${col}`] = this[`${col},${row}`]
    return rotated.flip()
}

Picture.prototype.enhance = function () {
    const divisor = (this.size % 2 === 0 ? 2 : 3)
    const enhanced = new Picture(this.size + this.size / divisor)
    for (let r = 0; r < this.size; r += divisor) {
        for (let c = 0; c < this.size; c += divisor) {
            let piece = this.slice([r, c], [r + divisor, c + divisor])
            piece = Picture.parse(rules[piece.join()])
            for (let i = 0; i < piece.size; i++) for (let k = 0; k < piece.size; k++)
                enhanced[`${r + r / divisor + i},${c + c / divisor + k}`] = piece[`${i},${k}`]
        }
    }
    return enhanced
}

// Read input
const input = require('fs').readFileSync('21.txt', { encoding: 'utf8' })
    .split(/\n|\r\n/)
    .map(line => /([.#\/]*)\s=>\s([.#\/]*)/.exec(line).slice(1, 3))

const rules = {}

// Flip rules
for (let line of input) {
    let key = Picture.parse(line[0])
    let enhancement = line[1]
    for (let i = 0; i < 4; i += 1) {
        rules[key.join()] = enhancement
        rules[key.flip().join()] = enhancement
        if (i < 3) key = key.rotate()
    }
}

let pic = Picture.parse('.#./..#/###')

for (let i = 1; i <= 18; i += 1) {
    pic = pic.enhance()
    
    if (i === 5 || i === 18) {
        let count = 0
        for (let row = 0; row < pic.size; row += 1)
            for (let col = 0; col < pic.size; col += 1)
                if (pic[`${row},${col}`] === '#') count += 1
        console.log(i === 5 ? 'Part 1:' : 'Part 2:', count)
    }
}