const data = require('fs')
    .readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
    .split(/\r\n|\r|\n/g)

function Particle(x1, x2, x3, v1, v2, v3, a1, a2, a3) {
    [this.x1, this.x2, this.x3, this.v1, this.v2, this.v3, this.a1, this.a2, this.a3] = [x1, x2, x3, v1, v2, v3, a1, a2, a3]
}

Particle.prototype.next = function next() {
    this.v1 += this.a1
    this.v2 += this.a2
    this.v3 += this.a3
    this.x1 += this.v1
    this.x2 += this.v2
    this.x3 += this.v3
}

let particles = []

for (let line of data) {
    let match = /p=<(-?\d+),(-?\d+),(-?\d+)>,\s+v=<(-?\d+),(-?\d+),(-?\d+)>,\s+a=<(-?\d+),(-?\d+),(-?\d+)>/.exec(line)
    particles.push(new Particle(...match.slice(1, match.length).map(v => parseInt(v))))
}

// Part 1
let accelerations = [] // find particle with smallest acceleration
for (let p of particles) {
    let a = Math.abs(p.a1) + Math.abs(p.a2) + Math.abs(p.a3)
    accelerations.push(a)
}

let min = Math.min(...accelerations)
let indexMin = accelerations.indexOf(min)

console.log('Part 1:', indexMin)

// Part 2
// function collision(p1, p2) {

//     let dx = [p1.x1 - p2.x1, p1.x2 - p2.x2, p1.x3 - p2.x3]
//     let dv = [p1.v1 - p2.v1, p1.v2 - p2.v2, p1.v3 - p2.v3]
//     let da = [p1.a1 - p2.a1, p1.a2 - p2.a2, p1.a3 - p2.a3]

//     let t = [...Array(3)], p = [...Array(3)], q = [...Array(3)]
//     p = p.map((v, i) => (dv[i] / da[i]))
//     q = q.map((v, i) => (2 * dx[i] / da[i]))
//     t = t.map((v, i) => {
//         if (da[i] === 0 & dv[i]) return x === 0
//         else return [-p[i] + (p[i] ** 2 - q[i]) ** 0.5, -p[i] - (p[i] ** 2 - q[i]) ** 0.5]
//     })

//     // collision when time positive, time is integer, and one point in time for x, y, z 
//     if (t[0][0] > 0 & Number.isInteger(t[0][0]) & t[0][0] === t[1][0] & t[0][0] === t[2][0]) return true
//     if (t[0][1] > 0 & Number.isInteger(t[0][1]) & t[0][1] === t[1][1] & t[0][1] === t[2][1]) return true
//     return false
// }

function collision(p1, p2) {
    function collTimeOnDim(p1, p2, i) {
        let [dx, dv, da] = [p1['x' + i] - p2['x' + i], p1['v' + i] - p2['v' + i], p1['a' + i] - p2['a' + i]]
        if (da === 0 & dv === 0) return dx === 0 // collision all the time
        else if (da === 0) return [-dx / dv]
        else if (dv === 0) return [(-2 * dx / da) ** 0.5]
        else return [- (dv / da) + ((dv / da) ** 2 - 2 * da / da) ** 0.5, - (dv / da) - ((dv / da) ** 2 - 2 * da / da) ** 0.5]
    }

    let t = [collTimeOnDim(p1, p2, 1), collTimeOnDim(p1, p2, 2), collTimeOnDim(p1, p2, 3)]
    // t = [true, [1, -2], [1]]
    t = t.filter(v => v !== true) // clear lines where equation is true for every t
    t.forEach((v) => v.filter(v => !Number.isInteger(v) | v < 0)) // clear non Integers and t < 0 for every coordinate

    for (let v of t) if (v.length === 0) return false // when empty solution for a coordinate then no collision

    if (t.length === 0) return true // points are at the same spot for every t
    else {
        let sols = [...t[0]]
        for (i = 1; i < t.length; i++) sols.forEach((s, i) => {
            if (t.indexOf(s) === -1) s.splice(i, 1)
        })
        if (sols.length === 0) return false
        else return true
    }


}

// let repeat = true
// while (repeat) {
//     repeat = false
//     for (let t = 0; t < 10000; t++) {
//         for (let i = 0; i < particles.length; i++) {
//             let found = false
//             for (let k = i + 1; k < particles.length; k++) {
//                 if (
//                     particles[i].x1 === particles[k].x1 &&
//                     particles[i].x2 === particles[k].x2 &&
//                     particles[i].x3 === particles[k].x3
//                 ) {
//                     found = true
//                     repeat = true
//                     particles.splice(k--, 1)
//                 }
//             }
//             if (found) particles.splice(i--, 1)
//         }
//         for (let j = 0; j < particles.length; j++) particles[j].next()
//     }
// }
// 
// console.log('Part 2: ', particles.length)

function col(p1, p2) {
    let a1 = total(p1, 'a')
    let a2 = total(p2, 'a')
    let v1 = total(p1, 'v')
    let v2 = total(p2, 'v')

    // copy objects, a shall be the faster moving object in the long term
    let a, b
    if (a1 === a2) {
        a = Object.assign({}, v1 > v2 ? p1 : p2)
        b = Object.assign({}, v1 > v2 ? p2 : p1)
    } else {
        a = Object.assign({}, a1 > a2 ? p1 : p2)
        b = Object.assign({}, a1 > a2 ? p2 : p1)
    }

    a.__proto__ = p1.__proto__
    b.__proto__ = p1.__proto__

    function diff(a, b, p = 'x') {
        return ((a[p + 1] - b[p + 1]) ** 2 + (a[p + 2] + b[p + 2]) ** 2 + (a[p + 3] + b[p + 3]) ** 2) ** 0.5
    }

    function total(a, p) {
        return ((a[p + 1]) ** 2 + (a[p + 2]) ** 2 + (a[p + 3]) ** 2) ** 0.5
    }

    function samePos(a, b) {
        return a.x1 === b.x1 && a.x2 === b.x2 && a.x3 === b.x3
    }

    // while distance to 0 does not increase
    // while distance to b does not increase
    let prevA_0
    let prevB_0
    let prevA_B
    let currA_0 = total(a, 'x')
    let currB_0 = total(b, 'x')
    let currA_B = diff(a, b, 'x')
    do {
        if (samePos(a,b)) return true
        prevA_0 = currA_0
        prevB_0 = currB_0
        prevA_B = currA_B
        a.next()
        b.next()
        currA_0 = total(a, 'x')
        currB_0 = total(b, 'x')
        currA_B = diff(a, b, 'x')
    } while (
        prevA_0 >= currA_0 ||
        prevB_0 >= currB_0 ||
        prevA_B > currA_B
    )

        // loop until a has higher acceleration, velocity and distance from 0 than b

        // while (
        //     //total(a, 'a') < total(b, 'a') &&
        //     total(a, 'v') < total(b, 'v')
        // ) {
        //     if (samePos(a, b)) return true
        //     a.next()
        //     b.next()
        // }

        // loop until distance between particles is increasing
        // let prevDistance
        // let currDistance = diff(a, b, 'x')
        // do {
        //     if (samePos(a, b)) return true
        //     prevDistance = currDistance
        //     a.next()
        //     b.next()
        //     currDistance = diff(a, b, 'x')
        // } while (prevDistance >= currDistance);

        return false
}

for (let i = 0; i < particles.length; i++) {
    let found = false
    for (let k = i + 1; k < particles.length; k++) {
        if (col(particles[i], particles[k])) {
            found = true
            particles.splice(k--, 1)
        }
    }
    if (found) {
        particles.splice(i--, 1)
        console.log(particles.length)
    }
}

console.log('Part 2:', particles.length)