const fs = require('fs')

let data = fs.readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
data = data.split(/\r\n|\r|\n/g)

// part 1
let count = 0
for (let line of data) {
    if (!line.match(/\b(\w+)\b.*\b\1\b/)) count++
}

console.log(count)

// part 2
// function permutate(str) {
//     function perm(str, rest) {
//         if (rest.length === 0) result.push(str)
//         else for (let i in rest) {
//             let tempRest = [...rest]
//             let tempStr = str + tempRest.splice(i, 1)
//             perm(tempStr, tempRest)
//         }
//     }

//     let result = []
//     perm('', [...str])
//     return result
// }

// permutate('abc')

// count = 0
// for (let line of data) {
//     let words = line.split(/\s+/)
//     let match = false
//     for (let word of words) {
//         let perms = permutate(word).join('|')
//         let reg = new RegExp(`\b(\w+)\b.*\b(${perms})\b`)
//         if (line.match(reg)) {
//             match = true
//             break
//         }
//     }
//     if (!match) count++
//     console.log('hi')
// }

count = 0
for (let line of data) {
    let words = line.split(/\s+/)
    let wordsSorted = words.map(v => v.split('').sort().join(''))
    let wordSet = new Set(wordsSorted)
    if (wordsSorted.length === wordSet.size) count++
}

console.log(count)
