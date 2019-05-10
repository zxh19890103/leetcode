/**
 * Initialize your data structure here.
 */

var TrieNode = function(char) {
    this.char = char
    this.children = []
    this.isWord = false
}

TrieNode.prototype.get = function(char) {
    return this.children.find(n => n.char === char)
}

TrieNode.prototype.has = function(char) {
    return this.children.findIndex(n => n.char === char) > -1
}

TrieNode.prototype.append = function(node) {
    return this.children.push(node)
}

var Trie = function(sentence) {
    this.root = new TrieNode(null)
    const words = sentence.split(' ')
    words.forEach((w) => {
        this.insert(w)
    })
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let current = this.root
    for (let i = 0, l = word.length; i < l; i ++) {
        let node = current.get(word[i])
        if (!node) {
            node = new TrieNode(word[i])
            current.append(node)
        }
        current = node
    }
    current.isWord = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let current = this.root
    for (let i = 0, l = word.length; i < l; i ++) {
        let node = current.get(word[i])
        if (node) {
            current = node
        } else {
            return false
        }
    }
    return current.isWord
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let current = this.root
    for (let i = 0, l = prefix.length; i < l; i ++) {
        let node = current.get(prefix[i])
        if (node) {
            current = node
        } else {
            return false
        }
    }
    return true
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const raw = `Now, how will we store these name/value pairs in a trie? A trie allows us to share prefixes that are common among keys. Again, our keys are names, which are strings. Let's start off with amy. We'll build a tree with each character in her name in a separate node. There will also be one node under the last character in her name (i.e., under y). In this final node, we'll put the nul character (\0) to represent the end of the name. This last node is also a good place to store the age for amy`
let time = 0
time = Date.now()
const obj = new Trie(raw)
const pm = obj.search('Singhi')
time = Date.now() - time
console.log(time)

time = Date.now()
raw.includes('Singhi')
time = Date.now() - time
console.log(time)