function* gen(id) {
    let val = (id === 'A' ? 873 : 583)
    let div = (id === 'A' ? 4 : 8)
    while (true) {
        val = (val * (id === 'A' ? 16807 : 48271)) % 2147483647
        if (val % div === 0) yield val
    }
}

let a = gen('A')
let b = gen('B')

let sum = 0
for (i = 0; i< 5000000; i++){
    let binA = a.next().value.toString(2)
    let binB = b.next().value.toString(2)
    sum += binA.substring(binA.length-16, binA.length) === binB.substring(binB.length-16, binB.length)
}

console.log(sum)

