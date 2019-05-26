/**
 * https://leetcode-cn.com/problems/spiral-matrix/
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    
    if (matrix.length === 0) return []
    if (matrix[0].length === 0) return []

    // boundaries
    let left = 0
    let top = 0
    let right = matrix[0].length - 1
    let bottom = matrix.length - 1
    
    /**
    * 0 - [left-top to right-top
    * 1 - right-top to right-bottom
    * 2 - right-bottom to left-bottom
    * 3 - left-bottom to left-top)
    */
    let dir = 0

    const log = console.log

    const check = (i, j) => {
        if (dir === 0 && j > right) {
            j -= 1
            dir = 1
            log(i, j, 'down')
            return [i, j]
        }
        if (dir ===1 && i > bottom) {
            i -= 1
            dir = 2
            log(i, j, 'left')
            return [i, j]
        }
        if (dir === 2 && j < left) {
            j += 1
            dir = 3
            log(i, j, 'up')
            return [i, j]
        }
        if (dir === 3 && i < top + 1) {
            // this is the key corner.
            i += 1
            dir = 0
            top += 1
            right -= 1
            bottom -= 1
            left += 1
            log(i, j, 'right')
            return [i, j]
        }

        return [i, j]
    }
    
    const next = (i, j) => {

        if (dir === 0) j += 1
        else if (dir === 1) i += 1
        else if (dir === 2) j -= 1
        else i -= 1

        const re = check(i, j)

        return re
    }

    let j = 20
    let r = 0, c = 0

    const spiral = [matrix[r][c]]

    const isEqual = ret => {
        return ret[0] === r && ret[1] === c
    }

    while (true) {
        let ret = next(r, c)
        if (isEqual(ret)) {
            ret = next(r, c)
            if (isEqual(ret)) {
                break
            }
        }
        [r, c] = ret
        spiral.push(matrix[r][c])
    }

    return spiral
};

const matrix = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
]

const r = spiralOrder(matrix)
console.log(r)