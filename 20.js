function Particle(str) {
    let match = /p=<(.+?),(.+?),(.+?)>,\s*v=<(.+?),(.+?),(.+?)>,\s*a=<(.+?),(.+?),(.+?)>/.exec(str).map(v => parseInt(v))
    this.p = [match[1], match[2], match[3]]
    this.v = [match[4], match[5], match[6]]
    this.a = [match[7], match[8], match[9]]
}

// load data from file
const data = require('fs')
    .readFileSync('20.txt', { encoding: 'utf8' })
    .split(/\r\n|\n/g)

// create particles from data
const particles = data.map(line => new Particle(line))

// Part 1
function abs(prop) { return (prop[0] ** 2 + prop[1] ** 2 + prop[2] ** 2) ** 0.5 }

// find particles with minimum acceleration (velocity and distance if equal)
let closest = 0
for (let i = 1; i < particles.length; i++) {
    if (abs(particles[i].a) < abs(particles[closest].a)) {
        closest = i
    } else if (abs(particles[i].a) === abs(particles[closest].a)) {
        if (abs(particles[i].v) < abs(particles[closest].v)) {
            closest = i
        } else if (abs(particles[i].v) === abs(particles[closest].v)) {
            if (abs(particles[i].p) < abs(particles[closest].p)) closest = i
        }
    }
}

console.log('Part 1:', closest)

// Part 2

// /** returns velocity v of particle for a given time t */
// Particle.prototype.vAt = function (t) { return this.v.map((v, i) => v + this.a[i] * t) }
// /** returns acceleration a of particle for a given time t */
// Particle.prototype.pAt = function (t) { return this.p.map((p, i) => p + (this.v[i] * t) + (t + t * t) / 2 * this.a[i]) }

/** returns an array of timings where the particles collide */
Particle.collision = function (p1, p2) {
    /** Input of the form a*x^2+b^x+c=0 
      * Returns an array of numbers for every solution.
      * A return value of true means that there is a solution for every x.
      * Returns false if there is no solution.
      */
    function solveQuadraticEquation(a, b, c) {
        let d
        if (a === 0) {
            if (b === 0) {
                if (c === 0) {
                    return true
                } else {
                    return false
                }
            } else {
                return [-c / b]
            }
        } else {
            if ((d = b ** 2 - 4 * a * c) < 0) {
                return false
            } else if (d === 0) {
                return [-b / (2 * a)]
            } else {
                return [(-b - d ** 0.5) / (2 * a), (-b + d ** 0.5) / (2 * a)]
            }
        }
    }
    /** Looks for one common solution under every dimsension */
    function commonSolution(arr) {
        // Filter impossible or always possible solutions
        if (arr.indexOf(false) !== -1) return false // filter false
        arr = arr.filter(v => v !== true) // filter true
        if (arr.length === 0) return [0] // all true
        arr = arr.map(set => set.filter(v => Number.isInteger(Math.round(v * 10) / 10))) // only integers are allowed
        arr = arr.map(set => set.filter(v => v >= 0)) // filter negative values
        if (arr.map(set => set.length === 0).indexOf(true) !== -1) return false // check for empty arrays

        // Look for one common solution
        let solutions = []
        for (let i = 0; i < arr[0].length; i++) {
            let collision = true
            for (let j = 1; j < arr.length; j++) {
                collision = collision && (arr[j].indexOf(arr[0][i]) !== -1)
            }
            if (collision) solutions.push(arr[0][i])
        }
        return (solutions.length > 0 ? solutions.sort((a, b) => a - b) : false)
    }

    // Solve the following quadratic equation for every dimension
    // 0 = t^2 + (1 + 2*Δv/Δa) * t + 2 * Δp/Δa
    let collisionTimings = []
    for (let i = 0; i < 3; i += 1) {
        // a * x^2 + b * x + c = 0
        let a = p1.a[i] - p2.a[i]
        let b = p1.a[i] - p2.a[i] + 2 * (p1.v[i] - p2.v[i])
        let c = 2 * (p1.p[i] - p2.p[i])
        collisionTimings.push(solveQuadraticEquation(a, b, c))
    }

    // See if collision timings on all axes match
    return commonSolution(collisionTimings)
}

// create array of collisions [{timings: [10, 30], p1: 26, p2: 110}, ...]
let collisions = []
for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
        let collision = Particle.collision(particles[i], particles[j])
        if (collision) collisions.push({
            timings: collision.slice(),
            p1: i,
            p2: j
        })
    }
}
collisions.sort((a, b) => a.timings[0] - b.timings[0]) // ... and sort it by first collision timing

let collided = new Set() // set of already collided particles
let tempCollided = [] // temporary array to collect particles colliding at the same point in time
let timing = collisions[0].timings[0]
while (collisions.length) {
    // new timing for a collision?
    if (timing !== collisions[0].timings[0]) {
        tempCollided.forEach(v => collided.add(v)) // add temporary collisions to final set
        tempCollided = [] // clear temporary collision
        timing = collisions[0].timings[0] // new timing
    }

    // if particles have not collided yet, let them collide
    if (!collided.has(collisions[0].p1) && !collided.has(collisions[0].p2)) {
        tempCollided.push(collisions[0].p1) // p1 collides
        tempCollided.push(collisions[0].p2) // p2 collides
    }

    // remove collision from array if no further collisions in the future
    collisions[0].timings.splice(0, 1)
    if (collisions[0].timings.length === 0) collisions.splice(0, 1)
    else collisions.sort((a, b) => a.timings[0] - b.timings[0])
}
tempCollided.forEach(v => collided.add(v))

console.log('Part 2:', particles.length - collided.size)