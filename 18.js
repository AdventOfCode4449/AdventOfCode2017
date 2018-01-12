const input = require('fs')
    .readFileSync(__filename.replace(/\.js$/i, '.txt'), { encoding: 'utf8' })
    .split(/\r\n|\r|\n/g)
    .map(v => v.split(/\s+/g))

// Part 1
let regs = Object.create(null)
regs.snd = function (name) { this.lastSound = { name: name, freq: this[name] } }
regs.set = function (name, value) { this[name] = value }
regs.add = function (name, value) { this[name] += value }
regs.mul = function (name, value) { this[name] *= value }
regs.mod = function (name, value) { this[name] %= value }
regs.rcv = function (name, value) { if (this[name] > 0) return { name: name } }
regs.jgz = function (name, value) { if (this[name] > 0) return value - 1 }

for (let i = 0; i < input.length; i++) {
    let ans
    let [func, a, b] = input[i]
    b = isNaN(b) ? regs[b] : parseInt(b)
    ans = regs[func](a, b)
    if (typeof ans === 'object') {
        console.log('Part 1: ', regs.lastSound.freq)
        break
    }
    if (typeof ans === 'number') i += ans
}

// Part 2
function Program(no) {
    this.p = no
    this.queue = []
    this.index = 0
    this.counter = 0
    this.wait = false
}

Program.prototype.set = function set(name, value) { this[name] = value }
Program.prototype.add = function add(name, value) { this[name] += value }
Program.prototype.mul = function mul(name, value) { this[name] *= value }
Program.prototype.mod = function mod(name, value) { this[name] %= value }
Program.prototype.jgz = function jgz(name, value) { if ((isNaN(name) ? this[name] : parseInt(name)) > 0) this.index += value - 1 }
Program.prototype.snd = function snd(name, value) { this.to.queue.push(isNaN(name) ? this[name] : parseInt(name)); this.counter += 1 }
Program.prototype.rcv = function rcv(name, value) {
    if (this.queue.length === 0) this.wait = true
    else {
        this.wait = false
        this[name] = this.queue.splice(0, 1)[0]
    }
}

const p0 = new Program(0)
const p1 = new Program(1)
p0.to = p1
p1.to = p0

while ((!p0.wait) | (!p1.wait)) {
    let r = (p1.queue.length > 0 | !p1.wait ? p1 : p0)
    if (r.index < input.length) {
        let [func, name, value] = input[r.index]
        value = isNaN(value) ? r[value] : parseInt(value)
        r[func](name, value)
        if (!r.wait) r.index += 1
    } else {
        r.wait = true
    }
}

console.log('Part 2:', p1.counter)
