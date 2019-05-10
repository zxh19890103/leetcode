/**
 * @param {string} L
 * @param {string} R
 * @return {number}
 */
const isPalindrome = (expr) => {
    let i = 0
    let j = expr.length - 1
    while (i < j) {
        if (expr[i] !== expr[j]) return false
        i ++
        j --
    }
    return true
}

const isTenTimes = (numExpr) => {
    // 10, 100, 1000, 10000
    return /^10+$/.test(numExpr)
}

const nextPalindrome = (expr) => {
    if (expr === '9') return 11
    if (expr.length === 1) {
        return Number(expr) + 1
    }
    let isEven = expr.length % 2 === 0
    let mid = Math.ceil(expr.length / 2)
    let exprLeft = expr.substring(0, mid)
    exprLeft = + exprLeft + 1 + ''
    const chars = Array.from(exprLeft).reverse()
    if (!isEven) chars.shift()
    if (isTenTimes(exprLeft)) {
        chars.shift()
    }
    return Number(exprLeft + chars.join(''))
}

function superpalindromesInRange(L, R) {
    let r = 0
    const min = BigInt(L) - 1n
    const max = BigInt(R) + 1n
    let i = 1n
    let double = 0n
    while ((double = (i * i)) < max) {
        if (double > min) {
            if (isPalindrome(double + '')) {
                r ++
            }
        }
        i = nextPalindrome(i + '')
        i = BigInt(i)
    }
    return r
}

const r = superpalindromesInRange(
    "38455498359",
    "999999999999999999"
)
console.log(r)
// console.log(nextPalindrome(12021))
// console.log(isPalindrome(1))
// console.log(isPalindrome(9))
// console.log(isPalindrome(11))
// console.log(isPalindrome(99))
// console.log(isPalindrome(101))
// console.log(isPalindrome(1111))
// console.log(isPalindrome('999999999999999999'))
// console.log('999999999999999999')
// 202