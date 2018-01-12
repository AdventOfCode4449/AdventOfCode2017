const fs = require('fs')
const path = require('path')


const file = fs.readFile(__filename.replace(/\.js$/i, '.txt'), 'utf8', (error, data) => {
    if (error) throw error

    // prepare input
    let lines = data.replace(/\r/g, '')
    lines = lines.split(/\n/g)
    lines = lines.map(v => v.split(/\s/g))

    // part 1
    let sum1 = lines.reduce((prev, curr) => {
        return prev + Math.max(...curr) - Math.min(...curr)
    }, 0)

    console.log(sum1)

    // part 2
    let sum2 = lines.reduce((prev, curr) => {
        for (let i in curr) {
            for (let k = parseInt(i) + 1; k < curr.length; k++) {
                if (curr[k] % curr[i] === 0) return (prev + curr[k] / curr[i])
                if (curr[i] % curr[k] === 0) return (prev + curr[i] / curr[k])
            }
        }
    }, 0)

    console.log(sum2)
})