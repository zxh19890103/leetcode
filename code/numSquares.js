/**
 * https://leetcode-cn.com/problems/perfect-squares/
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {

    let min = 9007199254740991
    
    let right = findTheNearest(n)
    
    for (let i = right; i > 0; i --) {
        let re = n
        let c = 0
        let output = ''
        while (re) {
            let max = Math.min(findTheNearest(re), i)
            c += 1
            output += max + ','
            re = re - max * max
        }
        console.log('>>', output)
        if (c < min) min = c
    }
    
    return min
};

function findTheNearest(n) {
    let max = 1
    while (max * max <= n) {
        max += 1
    }
    max --
    return max
}

/**
 * for N: 
 *  firstly, find the nearest number n which n*n is very about to equal to N.
 *  loop k in [1, n], we do things as bellow: 
 *      you've a remaining R = N - k*k.
 *      for R, we do the same thing as to N.
 */

function Tn(val) {
    this.val = val
    this.children = []
}

Tn.prototype.appendChild = function(val) {
    const n = new Tn(val)
    this.children.push(n)
    return n
}

function main() {
    const N = 1
    const root = new Tn(`${N}//:`)
    build(N, root)
    log(root)
}

function build(N, node) {
    if (N === 0) return
    const n = Math.floor(Math.sqrt(N))
    for (let k = n; k > 0; k --) {
        const r = N - k * k
        const child = node.appendChild(k)
        build(r, child)
    }
}

const findChild = (node) => {
    const child = node.children[0]
    if (child === undefined) return null
    else return child
}

const findSibling = (parent, node) => {
    const i = parent.children.findIndex(n => n === node)
    const next = parent.children[i + 1]
    if (next === undefined) return null
    else return next
}

function log(tree) {
    const path = []
    let cur = tree

    const complete = () => {
        let sibling = null
        while (sibling === null) {
            let c = path.pop()
            if (path.length === 0) {
                // the end of tranverse.
                return null
            }
            const parent = path[path.length - 1]
            sibling = findSibling(parent, c)
        }
        return sibling
    }

    while (cur) {
        path.push(cur)
        let child = findChild(cur)
        if (child === null) {
            // end of a branch
            // Work
            console.log('---branch')
            console.log(path.map(i => i.val).join('->'))
            cur = complete()
        } else {
            cur = child
        }
    }
}

var numSquares2 = function(n) {
    var answer=[0];
    for(let i=1;i<=n;i++){
        var top=Math.floor(Math.pow(i,1/2));
        var min=Number.MAX_VALUE;
        for(let j=top;j>=1;j--){
            if(answer[i-j*j]+1<min){
                min=answer[i-j*j]+1;
            }
        }
        answer[i]=min;
    }
    console.log(answer)
    return answer[n];
}

function numSquares3(n) {
    var f = {
        '0' : 0
    }
    for(let i = 1; i <= n; i++) {
        const k = Math.floor(Math.sqrt(i))
        for(let j = k ; j > 0; j --) {
            f[i] = Math.min(f[i] || n, f[i - j*j] + 1)
        }
    }
    return f[n]
}

// main()

// console.log(numSquares2(12))
// numSquares2(13)

console.log(numSquares3(12))