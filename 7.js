const fs = require('fs')

// Reading File input
let data = fs.readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
data = data.split(/\r\n|\r|\n/g)

// Creating List
let list = []
for (let line of data) {
    let item = {}
    let match = /^(\w+)\s\((\d+)\)(?:\s->\s(.*))?/.exec(line)
    item.name = match[1]
    item.weight = parseInt(match[2])
    item.children = match[3] ? match[3].split(', ') : []

    list.push(item)
}

// Finding root element
let root = (list => {
    let findRoot = index => {
        for (let k in list) {
            if (list[k].children.indexOf(list[index].name) !== -1) {
                list.splice(index, 1)
                return findRoot(k - (k > index ? 1 : 0))
            }
        }
        return list[index]
    }

    return findRoot(0)
})(list.slice())

console.log(root)

// Replace children string with objects
root = (function makeTree(list, node) {
    for (let childIndex in node.children) {
        for (let item of list) {
            if (item.name == node.children[childIndex]) {
                node.children[childIndex] = item
                item.parent = node
            }
        }
    }

    for (let child of node.children) {
        makeTree(list, child)
    }

    return node

})(list.slice(), root)

// Add total weight to children
;(function totalWeight(node) {
    node.total = node.weight
    for (let child of node.children) {
        node.total += totalWeight(child)
    }

    return node.total
})(root)

// Find imbalance
let imbalance = (function imbalance(node) {
    let valCounter = {}
    for (let child of node.children) {
        if (valCounter[child.total] === undefined) valCounter[child.total] = {node: child, count: 1}
        else valCounter[child.total].count += 1
    }

    let returnVal
    if (Object.keys(valCounter).length === 1) return node
    else for (key of Object.keys(valCounter)) {
        if (valCounter[key].count === 1) returnVal = imbalance(valCounter[key].node)
        else node.balance = valCounter[key].node.total
    }
    return returnVal
})(root)

console.log(imbalance)
console.log(imbalance.parent.balance - imbalance.children[0].total * imbalance.children.length)
