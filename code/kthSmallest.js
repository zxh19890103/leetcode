/**
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/comments/
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */

function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}

/**
 * @param {Boolean} flag Is left or right
 */
TreeNode.prototype.remove = function(flag) {
    if (flag) {
        const left = this.left
        if (left) this.left = left.left
    } else {
        const right = this.right
        if (right) this.right = right.right
    }
}

TreeNode.prototype.insert = function(val) {
    if (val === null) return false
    if (val > this.val) {
        // right
        const right = this.right
        if (right && right.val < val) return false
        const node = new TreeNode(val)
        this.right = node
        node.right = right
        return true
    } else {
        // left
        const left = this.left
        if (left && left.val > val) return false
        const node = new TreeNode(val)
        this.right = node
        node.right = left
        return true
    }
}

TreeNode.prototype.get = function(i) {
    const path = []
    let n = i
    while (n) {
        // parent
        n = 0 | (n - 1) / 2
        path.unshift(n % 2)
    }
    let p = null
    let node = this
    while ((p = path.shift()) !== undefined) {
        if (p === 0) node = node.right
        else node = node.left

        if (node === null) return null
    }
    return node
}

function buildBSTFromArray(arr) {
    // [3,1,4,null,2]
    // 0, 1, 2, 3, 4
    // for the n-th node, the left child is at 2 * n + 1 
    // and the right child is at 2 * n + 2
    const L = arr.length
    if (L === 0) return null
    const n = 0
    const root = new TreeNode(arr[n])

    const deep = (node, i) => {
        const left = 2 * i + 1
        if (left < L && arr[left] !== null) {
            node.left = new TreeNode(arr[left])
            deep(node.left, left)
        }
        const right = 2 * i + 2
        if (right < L && arr[right] !== null) {
            node.right = new TreeNode(arr[right])
            deep(node.right, right)
        }
    }

    deep(root, n)

    return root
}

var kthSmallest = function(root, k) {
    const q = []
    traverse(root, q)
    let i = 1
    let val = null
    while ((val = q.shift()) !== undefined) {
        if (k === i) return val
        i++
    }
    return 0
}

function traverse(node, queue) {
    if (node === null) return
    traverse(node.left, queue)
    // do
    queue.push(node.val)
    traverse(node.right, queue)
}

function log(node) {
    if (node === null) return
    log(node.left)
    console.log(node.val)
    log(node.right)
}

const bst = buildBSTFromArray([5,3,6,2,4,null,null,1])
bst.insert(2)
const p = bst.get(1)
const r = p.insert(4)
console.log(r)
log(bst)