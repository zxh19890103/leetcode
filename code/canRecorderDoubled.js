/**
 * https://leetcode-cn.com/problems/array-of-doubled-pairs/submissions/
 * @param {number[]} A
 * @return {boolean}
 */

const log = (A, s, e) => {
    let arr = ''
    for (let i = s; i < e; i ++) {
        arr += A[i] + ','
    }
    console.log(`A[${s},${e})`, arr)
}

var isRecorderDoubled = function(A, s, e, flag) {
    log(A, s, e)
    const l = e - s
    if (l % 2 === 1) return false
    if (flag === 0 || l === 0) return true
    let i = flag === 1 ? e - 1 : s
    const map = {}
    const M = l / 2
    let c = 0
    /**
     * Imaging there are N numbers in A[s, e), which means N = e - s
     * Then there must be N / 2 numbers which are all even.
     * set they are R = A{...}
     * then for c ¢ R, c is even, c = 2 * d, which d must be in A[s, e) and out of R.
     * set L = A{...} where A[s, e) = L + R
     *  */
    while (true) {
        i = next(i, map, flag, A, s, e)
        if (i === -1) break
        const n = A[i]
        console.log('---')
        console.log('try:', i, A[i])
        if (n % 2 === 1) break
        const half = n / 2
        const exist = find(half, map, A, s, e)
        console.log('got:', exist, A[exist])
        if (exist === -1) break
        // Found a pair.
        map[i] = exist
        map[exist] = i
        c += 1
    }

    if (c < M) {
        console.log(c, M)
        return false
    }
    return true
}

function next(i, map, flag, A, s, e) {
    let j = i
    do {
        if (map[j] === undefined) return j
        j = j - flag
    } while (j >= s && j < e)
    return -1
}

function find(n, map, A, s, e) {
    // binary find
    while (e > s) {
        let mid = 0 | (s + e) / 2
        const t = A[mid]
        if (t > n) {
            e = mid
        } else if (t < n) {
            s = mid + 1
        } else {
            // left
            let x = mid
            while (x >= s && A[x] === t) {
                if (map[x] === undefined) return x
                x -= 1
            }
            // right
            let y = mid + 1
            while (y < e && A[y] === t) {
                if (map[y] === undefined) return y
                y += 1
            }
            return -1
        }
    }
    return -1
}

var canReorderDoubled = function(A) {
    const a = A
    a.sort((a, b) => a - b)
    let s = -1 // the first zero
    let e = -1 // the first posi
    // [0, s) => {-N}
    // [s, e) => {0}
    // [e, L) => {+N}
    for (let i = 0, l = a.length; i < l; i ++) {
        if (s === -1 && a[i] === 0) s = i
        if (e === -1 && a[i] > 0) e = i
    }
    if (s === -1) s = e
    if (s === -1) s = e = a.length
    if (e === -1) e = a.length
    console.log(a)
    return isRecorderDoubled(a, 0, s, -1) &&
        isRecorderDoubled(a, s, e, 0) &&
        isRecorderDoubled(a, e, a.length, 1)
}

// const a = [1,2,1,-8,8,-4,4,-4,2,-2]
// const a = [1,2,4,8]
const a = [-1,4,6,8,-4,6,-6,3,-2,3,-3,-8, -20, -10]
// [5 10 6 12]
// 5 6 10 12
const r = canReorderDoubled(a)
console.log(r)