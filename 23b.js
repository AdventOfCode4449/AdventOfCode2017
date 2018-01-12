// b = 81 // set b 81
// c = b // set c b
// goto A // jnz a 2
// goto B // jnz 1 5
// A: b *= 100 // mul b 100
// b += 100000 // sub b -100000
// c=b // set c b
// c += 17000// sub c -17000
// B: f=1 // set f 1
// d=2 // set d 2
// E: e=2 // set e 2
// D: g=d // set g d
// g*=e // mul g e
// g -= b// sub g b
// if(g) goto C// jnz g 2
// f = 0 // set f 0
// C: e+=1 // sub e -1
// g=e // set g e
// g-=b // sub g b
// if(g) goto D// jnz g -8
// d += 1// sub d -1
// g =d // set g d
// g-=b// sub g b
// if(g) goto E// jnz g -13
// if(f) goto F // jnz f 2
// h+=1 // sub h -1
// F: g=b // set g b
// g-=c // sub g c
// if(g) goto G // jnz g 2
// goto H// jnz 1 3
// G: b+=17// sub b -17
// goto B// jnz 1 -23
// H:

// b = 81 * 100 + 100000
// c = b + 17000
// while (true) {
//     f = 1
//     d = 2
//     do {
//         e = 2
//         do {
//             g = d * e - b
//             if (g === 0) f = 0
//             e += 1
//             g = e - b
//         } while (g !== 0)
//         d += 1
//         g = d - b
//     } while (g !== 0)
//     if (f === 0) h += 1
//     g = b - c
//     if (g === 0) break
//     b += 17
// }

// do { // what is sooner equal to 0? 'd*e - b' or 'g - b'
//     if (d * e === b) f = 0
//     e += 1
// } while (e < b)
//--> if (b % d === 0) f=0

let [a, b, c, d, e, f, g, h] = [1, 0, 0, 0, 0, 0, 0, 0, 0]

b = 81 * 100 + 100000
c = b + 17000
// while (true) {
//     f = 1
//     d = 2
//     do {
//         if (b % d === 0 && b / e > 1) f = 0
//         d += 1
//     } while (d - b < 0)
//     if (f === 0) h += 1
//     if (b > c) break
//     b += 17
// }

// for (108100; b <= 125100; b += 17) {
//     f = 1; d = 2
//     do {
//         if (b % d === 0 && b / e > 1) {
//             h += 1
//             break
//         }
//         d += 1
//     } while (d - b < 0)
//     //if (f === 0) h += 1
// }

// find prime numbers...
for (108100; b <= 125100; b += 17) {
    for (d = 2; d<b; d++) {
        if (b % d === 0) {
            h += 1
            break
        }
    }
}

console.log(h)