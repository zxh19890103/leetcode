var longestValidParentheses = function(s) {
    let val = null
    const target = new Array()
    const map = new Array()
    for (let i = 0, max = s.length; i < max; i ++) {
        val = s[i]
        const e = construct(i, val)
        if (add(target.last(), e) === 0) {
            map.push(target.pop().index, e.index)
        } else {
            target.push(e)
        }
    }
    return findTheMostRemote(map)
};

const flat = (map) => {
    const l = map.length
    if (l < 4) return map
    const r = []
    const from = map[l - 2]
    for (let i = l - 3; i >= 0; i -= 2) {
        if (map[i] < from) {
            r.unshift(map[i - 1], map[i])
        }
    }
    return [...flat(r), map[l - 2], map[l - 1]]
}

const merge = (flatted) => {
    const merged = []
    for (let i = 0, k = flatted.length; i <= k; i += 2) {
        const lastTo = flatted[i - 1]
        const thisFrom = flatted[i]
        if (thisFrom === lastTo + 1) continue
        else {
            lastTo !== undefined && merged.push(lastTo)
            thisFrom !== undefined && merged.push(thisFrom)
        }
    }
    return merged
}

const findTheMostRemote = (map) => {
    const merged = merge(flat(map))
    let max = 0
    for (let i = 0, l = merged.length; i < l; i += 2) {
        const span = merged[i + 1] - merged[i] + 1
        if (span > max) max = span
    }
    return max
}

Array.prototype.last = function() {
    const i = this.length - 1
    if (i < 0) return { i: -1, val: null }
    return this[i]
}

const construct = (i, val) => {
    return { index: i, val }
}

const add = (e0, e1) => {
    if (e0.val === '(' && e1.val === ')') return 0
    else return 2
}