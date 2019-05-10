/**
 * https://leetcode-cn.com/problems/copy-list-with-random-pointer/submissions/
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */

var tryCopy = (node) => {
    if (node === null) return null
    if (node.__alter__) return node.__alter__
    const n = new Node(node.val, node.next, node.random)
    node.__alter__ = n
    return n
}

var copyRandomList = function(head) {
    const newh = tryCopy(head)
    let cur = newh
    while (cur) {
        const r = tryCopy(cur.random)
        const n = tryCopy(cur.next)
        // copy random
        cur.random = r
        // copy next
        cur.next = n
        // next node.
        cur = n
    }
    return newh
};