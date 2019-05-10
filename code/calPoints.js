/**
 * https://leetcode-cn.com/problems/baseball-game/submissions/
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
    let c = null
    let i = 0
    const score = []
    let l = 0
    while (c = ops[i]) {
        switch (c) {
            case '+':{ // a trun
                score.push(score[l - 2] + score[l - 1])
                l ++
                break
            }
            case 'D':{ // a turn
                score.push(score[l - 1] * 2)
                l ++
                break
            }
            case 'C': // a oper
                score.pop()
                l --
                break
            default: // a turn
                score.push(+c)
                l ++
                break
        }
        i += 1
    }
    return score.reduce((p, c) => c + p, 0)
};