/**
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

require('../shared/Array.plugins')
const TreeNode = require('../shared/BinaryTreeNode')
const { buildBSTFromArray } = require('../shared/buildBTFromArray')

const log = (nodes) => {
    const out = nodes.map(n => n.val).join(',')
    console.log(out)
}

var lowestCommonAncestor = function(tree, p, q) {
    console.log('begin')
    const b4p = tree.path(p)
    const b4q = tree.path(q)
    log(b4p)
    log(b4q)
    for (let i = 0; ; i ++) {
        if (b4p[i] !== b4q[i]) return b4p[i - 1]
    }
}

const array = [3,5,1,6,2,0,8,null,null,7,4]
const tree = buildBSTFromArray(array)

const p = tree.root.left
const q = tree.root.right

const common = lowestCommonAncestor(tree, p, q)

console.log(common.val)