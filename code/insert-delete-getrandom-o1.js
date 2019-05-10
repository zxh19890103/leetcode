/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    this.indexs = {}
    this.values = {}
    this.l = 0
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.indexs[val] === undefined) {
        let i = this.l ++
        this.indexs[val] = i
        this.values[i] = val
        return true
    }
    return false
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (this.indexs[val] === undefined) {
        return false
    } else {
        const i = this.indexs[val]
        delete this.indexs[val]
        delete this.values[i]
        return true
    }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    // consider the removed indexs
    // e.g. this.removed = [1, 3, 5]
    // and this.l is the length
    // then the possible index will be [0, l - 1) && removed
    const keys = Object.keys(this.values)
    let r = Math.floor(Math.random() * keys.length)
    return this.values[keys[r]]
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */