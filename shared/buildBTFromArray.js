require('./Array.plugins')
const TreeNode = require('./BinaryTreeNode')

function BinaryTree(val) {
    this.root = new TreeNode(val)
}

BinaryTree.prototype.path = function(node) {
    const r = this.root
    let cur = r
    const path = []
    while (cur) {
        while (cur) {
            path.push(cur)
            if (cur === node) return path
            cur = cur.left
        }
        let par = path.pick()
        while (!cur) {
            cur = par.right
            if (cur) break
            let top = null
            do {
                par = path.pop()
                top = path.pick()
            } while (top && top.right === par)
            par = top
        }
    }
    return path
}

function buildBSTFromArray(arr) {
    // [3,1,4,null,2]
    // 0, 1, 2, 3, 4
    // for the n-th node, the left child is at 2 * n + 1 
    // and the right child is at 2 * n + 2
    const L = arr.length
    if (L === 0) return null
    const n = 0
    const tree = new BinaryTree(arr[n])
    const root = tree.root

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

    return tree
}

module.exports = {
    buildBSTFromArray,
    BinaryTree
}