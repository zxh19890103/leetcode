/**
 * @param {number[]} A
 * @return {number}
 */

var sumSubarrayMins = function(A) {
    const L = A.length
    const mod = 1e9+7
    const stack = []
    let limit = 1
    let sum = 0
    let i = 0
    while (limit <= L) {
        let min = A[i + limit - 1]
        if (limit > 1) {
            let compareTo = stack.shift()
            if (compareTo < min) min = compareTo
        }
        sum += min
        sum = sum % mod
        stack.push(min)
        if (i + limit === L) {
            limit += 1
            i = 0
            stack.pop() // ???
        } else {
            i += 1
        }
    }
    return sum
}
/**
 */

console.log(sumSubarrayMins([1,2,3,4,5]))
console.log(sumSubarrayMins([2,2,2,2,2]))
console.log(sumSubarrayMins([4,3,2,1, 5]))
console.log(sumSubarrayMins([5, 4,3,2,1]))