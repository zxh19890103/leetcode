/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var decodeAtIndex = function(S, K) {
    const arr = []
    let c = 0
    S = S + '1'
    for (let i =0, l = S.length; i < l; i ++) {
        if (S[i] >= 'a' && S[i] <= 'z') {
            c ++
        } else {
            arr.push('+')
            arr.push(c + '')
            arr.push('*')
            arr.push(S[i])
            c = 0
        }
    }

    arr.splice(arr.length - 2, 2)
    let j = -1 // 指向解码数组的位置
    let i = 0 // 指向 arr 数组位置
    let idx = -1 // 指向编码数组 S 的位置
    while (i < arr.length) {
        let oper = arr[i]
        if (oper === '+') {
            i ++
            j += + arr[i]
            idx += + arr[i]
        } else if (oper === '*') {
            i ++
            j += (arr[i] - 1) * (j + 1) // 当前解码数组的长度为 j + 1
            idx += 1
        }
        if (j >= K) {
            // 两个情况，一个是 + 操作导致
            // 另一个是 * 操作导致
            if (oper === '+') {
                // 对于情况 1
                const diff = j - K
                const p = idx - diff
                return findChar(S, idx, p)
            } else {
                // 对于情况 2
                // here use while. 
                let l = j + 1
                let k = K
                let m = -1
                while (true) {
                    l = l / (arr[i] - 1) // * 操作之前的解码数组的长度
                    m = k % l // *操作之后的索引 K，相当于*操作之前的解码数组的索引
                    k = m
                    idx -= 1 // 去掉倍数
                    i -= 2 // 倍数
                    if (k + (+arr[i]) >= l) { // m 落在最后的 +操作阶段
                        const p = arr[i] - (l - k)
                        return findChar(S, idx, p)
                    } else {
                    }
                }
            }
        }
    }
}


const findChar = (S, i, p) => {
    return 'a'
    while (true) {
        i --
        if (S[i] >= '2' && S[i] <= '9') {
            return S[i + p + 1]
        }
    }
}