/**
 * https://leetcode-cn.com/problems/add-two-numbers-ii/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 1 -> 2 -> 4 -> null
 
 4 -> 2 -> 1 -> null
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const log = (l) => {
    while (l) {
        console.log(l.val)
        l = l.next
    }
}

function ListNode(val, next) {
    this.val = val
    this.next = next || null
}

function toList(array) {
    let h = null
    let l = h
    let i = 0
    let val = null
    while (true) {
        val = array[i]
        if (val === undefined) break
        const n = new ListNode(val)
        if (l) l.next = n
        l = n
        h || (h = l)
        i ++
    }
    return h
}

var reverse = (l) => {
    let prev = null
    let curr = l
    let next = null
    while (next = curr.next) {
        curr.next = prev
        prev = curr
        curr = next
    }
    curr.next = prev
    return curr
}

var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode(0)
    let l = l3
    l1 = reverse(l1)
    l2 = reverse(l2)
    let gt9 = 0
    let s = 0
    while (true) {
        s = gt9 + (l1 ? l1.val : 0) + (l2 ? l2.val : 0)
        l1 && (l1 = l1.next)
        l2 && (l2 = l2.next)
        l.val = s % 10
        gt9 = s > 9 ? 1 : 0
        if (l1 === null && l2 === null) {
            if (gt9)
                l.next  = new ListNode(1)
            break
        } else {
            l.next = new ListNode(0)
            l = l.next
        }
    }
    return reverse(l3)
}

/*
[7,2,4,3]
[5,6,4]
*/
const l1 = toList([7,2,4,3])
const l2 = toList([5,6,4])

//[7,8,0,7]
const l3 = addTwoNumbers(l1, l2)
log(l3)

