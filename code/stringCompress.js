/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) { 
    let lastC = null
    let count = 0
    let c = null
    for (let i = 0, l = chars.length; i <= l; i ++) {
        c = chars[i]
        if (c === lastC) {
            count += 1
        } else {
            if (count > 0) {
                const ins = (count + 1 + '').split('')
                chars.splice(i - count, count, ...ins)
                i += ins.length - count
                count = 0
            }
            lastC = c
        }
    }
    return chars.join('')
};

console.log(compress(['a', 'a', 'b', 'b', 'b', 'c']) === 'a2b3c', 'thru')