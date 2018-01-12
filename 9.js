let data = require('fs').readFileSync(__filename.replace(/js$/, 'txt'), { encoding: 'utf8' })
let match, str = data

// Part 1
str = str.replace(/!./g, '') // remove ignored characters
str = str.replace(/<.*?>/g, '') // remove garbage < ... >

function score(str) {
    let regex = /(?=[^!]){|}/g, level = 0, score = 0, match
    while (match = regex.exec(str)) {
        if (match[0] === '{') level+= 1
        else score += level--
    }
    return score
}

console.log('Part 1:', score(str))

// Part 2
str = input
str = str.replace(/!./g, '') // remove ignored characters
let garbage = str.length - str.replace(/<.*?>/g, '<>').length // remove garbage < ... >

console.log('Part 2:', garbage)