const num = 361527

// part 1
// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23  24  25 

const r = Math.ceil((num ** 0.5 - 1) / 2) // radial steps or no of ring
const t = ((num - (2 * (r - 1) + 1) ** 2) + r) % (r * 2) // tangential steps to go to the middle edge

console.log(t, r, r + t);

// part 2
// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...

function sumAdjecent(pos) {
    let sum = 0
    for (let vec of goAround(1)) {
        sum += map[add(pos, vec).join()] || 0
    }
    return sum
}

function* goAround(r) {
    let x = 0, y = 0
    yield [++x, y] // initial step right
    for (let i = 0; i < r * 2 - 1; i++) yield [x, ++y] // go up
    for (let i = 0; i < r * 2; i++) yield [--x, y] // go left
    for (let i = 0; i < r * 2; i++) yield [x, --y] // go down
    for (let i = 0; i < r * 2; i++) yield [++x, y] // go right
}

function add(a, b) { return [a[0] + b[0], a[1] + b[1]] }

let map = { '0,0': 1 }, currPos = [0, 0], lastVal = 0, ring = 1
let answer = (() => {
    while (lastVal <= num) {
        let vectors = goAround(ring)
        let newPos
        for (let vector of vectors) {
            newPos = add(currPos, vector)
            lastVal = sumAdjecent(newPos)
            if (lastVal > num) return lastVal
            map[newPos.join()] = lastVal
        }
        currPos = newPos
        ring++
    }
})()

console.log(answer)