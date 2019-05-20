/**
 * https://leetcode-cn.com/problems/basic-calculator-ii/
 * @param {string} s
 * @return {number}
 */

Array.prototype.peek = function () {
    return this[this.length - 1] || null
}

var calculate = function(s) {
    const stack = []
    let num = ''
    
    const isOperator = (c) => {
        return c === '*' ||
            c === '/' ||
            c === '+' ||
            c === '-'
    }
    
    const isSpace = (c) => {
        return c === ' '
    }
    
    const isSimpleOperator = (c) => c === '+' || c === '-'
    
    const computeOnce = (popBrace = false) => {
        let n0 = null, oper = null, n1 = null
        let res = null
        n0 = stack.pop()
        if (stack.peek() === '(') {
            res = n0
        } else {
            oper = stack.pop(),
            n1 = stack.pop()
            switch (oper) {
                case '+': res = n0 + n1; break
                case '-': res = n1 - n0; break
                case '*': res = n0 * n1; break
                case '/': res = 0 | n1 / n0; break
                default: throw new Error('hey')
            }
        }
        const isBrace = stack.peek() === '('
        if (isBrace && popBrace) stack.pop()
        stack.push(res)
        if (isBrace) return false
        return stack.length > 1
    }

    const pushNum = () => {
        if (num === '') return
        stack.push(+num)
        num = ''
    }

    const pushOperator = (c) => {
        stack.push(c)
        // lastOperator =  isSimpleOperator(c) ? 1 : 2
    }

    const getLastOperator = () => {
        let i = stack.length - 1
        while (i --) {
            const char = stack[i]
            if (char === '(') return 0
            if (char === '*' || char === '/') return 2
            else if (char === '+' || char === '-') return 1
        }
        return 0
    }
    
    s = s + '+'
    
    for (let char of s) {
        if (isSpace(char)) continue
        if (isOperator(char) || char === ')') pushNum()
        if (isOperator(char)) {
            const isSimpleOper = isSimpleOperator(char)
            const loper = getLastOperator()
            if (isSimpleOper && loper > 0) {
                while (computeOnce()) {}
            } else if (!isSimpleOper && loper === 2) {
                computeOnce()
            }
            pushOperator(char)
        } else if(char === '(') {
            stack.push(char)
        } else if(char === ')') {
            while (computeOnce(true)) {}
        } else {
            num += char
        }
    }
    // remove the last '+'
    stack.pop()
    const res = stack.pop()
    return res
}

const r1 = calculate("(4)")
// const r2 = calculate("3+2*2")

console.log(r1)