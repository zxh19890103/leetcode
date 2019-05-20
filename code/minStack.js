/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.data = []
    
    this.minC = (() => {
        const data = []
        let size = 0
        let min = Number.MAX_SAFE_INTEGER

        const getTopIndex = () => 2 * size - 2
        
        const top = () => {
            return min
        }
        
        return {
            top,
            push: (x) => {
                if (x < min) {
                    min = x
                    data.push(x, 1)
                    size += 1
                } else if(x === min) {
                    data[getTopIndex() + 1] += 1
                }
            },
            pop: (x) => {
                if (min === x) {
                    const idx = getTopIndex()
                    data[idx + 1] -= 1
                    if (data[idx + 1] === 0) {
                        data.splice(idx)
                        size -= 1
                        if (size === 0) min = Number.MAX_SAFE_INTEGER
                        else min = data[getTopIndex()]
                    }
                }
            }
        }
    })()
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.data.push(x)
    this.minC.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const x = this.data.pop()
    this.minC.pop(x)
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.data[this.data.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    const min = this.minC.top()
    if (min === Number.MAX_SAFE_INTEGER) return null
    else return min
};

/** 
 * Your MinStack object will be instantiated and called as such:
 */

var obj = new MinStack()
obj.push(20)
obj.push(10)
obj.pop()
obj.pop()
var param_3 = obj.top()
console.log(obj.minC)
var param_4 = obj.getMin()

console.log(param_3, param_4)