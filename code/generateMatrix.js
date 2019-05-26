/**
 * @param {number} n
 * @return {number[][]}
 */


const defGetter = (o, config) => {
    Object.keys(config).forEach(key => {
        Object.defineProperty(o, key, {
            get: config[key]
        })
    })
}

var generateMatrix = function(n) {
    
    const next = (_i = 0, _j = -1) => {
        let way = 0
        let m = n
        let d = 0
        let i = _i
        let j = _j
        let wayMutated = false
        let isEnding = false

        const setWay = (w) => {
            way = w
            wayMutated = true
        }
        
        const walk = () => {
            i -= d
            j -= d
            switch (way) {
                case 0:
                    j += 1
                    if (j === m) {
                        setWay(1)
                        j -= 1 // restore
                    }
                    break
                case 1:
                    i += 1
                    if (i === m) {
                        setWay(2)
                        i -= 1
                    }
                    break
                case 2:
                    j -= 1
                    if (j < 0) {
                        setWay(3)
                        j += 1
                    }
                    break
                case 3:
                    i -= 1
                    if (i < 1) {
                        setWay(0)
                        i += 1
                    }
                    break
            }

            i += d
            j += d
        }
        
        const ret = {
            go: () => {
                walk()
                // i,j keeps the same in this case.
                if (wayMutated) {
                    wayMutated = false
                    // here we know we should shrink the area.
                    if (way === 0) {
                        m -= 2
                        d += 1
                    }
                    walk()
                    // mutated again means it's all about to the ending.
                    if (wayMutated) {
                        isEnding = true
                    }
                }
            }
        }

        defGetter(ret, {
            i: () => i,
            j: () => j,
            isEnding: () => isEnding
        })

        return ret
    }
    
    const g = next(0, -1)
    
    const matrix = new Array(n).fill(0).map(i => {
        return new Array(n).fill(0)
    })

    let i = 1

    while (true) {
        g.go()
        console.log(g.i, g.j, g.isEnding)
        if (g.isEnding) break
        matrix[g.i][g.j] = i
        i += 1
    }

    return matrix
};

generateMatrix(2)