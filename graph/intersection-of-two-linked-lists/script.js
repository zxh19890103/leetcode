class ListNode {
    val = null
    next = null
    dataset = {
        xy: { x: 0, y: 0 },
        initial: true
    }
    /**
     * Head of a List
     * @param {number} val 
     */
    constructor(val) {
        this.val = val
    }

    /**
     * Array to nodes being appended behind.
     * @param {Array<number>} arr 
     */
    append(...arr) {
        let cursor = this.last()
        for (let i = 0, l = arr.length; i < l; i ++) {
            const node = new ListNode(arr[i])
            cursor.next = node
            cursor = node
        }
        return this
    }

    last() {
        let cursor = this
        while (cursor.next) {
            cursor = cursor.next
        }
        return cursor
    }

    concat(l) {
        let cursor = this.last()
        cursor.next = l
    }

    isEmpty() {
        return this.val === null
    }

    print() {
        let cursor = this
        let out = '>> '
        while (cursor) {
            out += cursor.val + '->'
            cursor = cursor.next
        }
        out += 'null'
        console.log(out)
    }

    *[Symbol.iterator]() {
        let cursor = this
        while (cursor) {
            yield cursor
            cursor = cursor.next
        }
    }
}

const la = new ListNode(5).append(0, 1, 4, 7, 9, 12, 34, 5)

const lb = new ListNode(4).append(1, 3, 4, 6)

const shared = new ListNode(8).append(4, 5, 3, 1)

la.concat(shared)
lb.concat(shared)

la.print()
lb.print()

class ListNodeCircle {
    /**
     * ListNodeCircle
     * @param {ListNode} node 
     * @param {CanvasRenderingContext2D} context
     * @param {number} x the start x.
     * @param {number} y the height.
     */
    constructor(node, context, x, y) {
        this.node = node
        this.context = context
        this.x = x
        this.y = y

        this.r = 10 // the radius
        this.span = 60 // circle distance.

        this.xygen = null
    }

    /**
     * render
     * @param {ListNode} stopNode 
     */
    render(stopNode) {
        this.xygen = this.xyGen()
        let lastX = null
        let lastY = null
        for (let n of this.node) {
            if (n === stopNode) break
            const { x, y } = this.xygen.next()
            if (lastX !== null)
                this.line(lastX, lastY, x, y)
            const ds = n.dataset
            ds.xy = { x, y }
            this.draw(n)
            lastX = x
            lastY = y
        }
    }

    xyGen() {
        let x = null
        let y = null
        const g = {
            x: 0,
            y: 0,
            next: () => {
                if (x === null) x = this.x
                else x += this.span
                if (y === null) y = this.y
                return { x, y }
            }
        }
        Object.defineProperty(g, 'x', {
            get: () => x
        })
        Object.defineProperty(g, 'y', {
            get: () => y
        })
        return g
    }

    /**
     * draw a node as a circle.
     * @param {ListNode} node
     * @param {string} bgColor 
     * @param {string} textColor 
     */
    draw(node) {
        const cxt = this.context
        const ds = node.dataset
        const { x, y } = ds.xy
        const R = this.r
        cxt.fillStyle = 'black'
        cxt.beginPath()
        cxt.arc(x, y, R, 0, 2 * Math.PI, false)
        cxt.fill()
        cxt.fillStyle = 'white'
        cxt.fillText(node.val, x - 3, y + 3)
    }

    line(x0, y0, x1, y1) {
        const cxt = this.context
        const data = this.shrink(x0, y0, x1, y1)
        cxt.beginPath()
        cxt.moveTo(data[0], data[1])
        cxt.lineTo(data[2], data[3])
        cxt.stroke()
        this.drawArrow(data[2], data[3], this._calAngle(...data))
    }

    curve(_x0, _y0, _x1, _y1) {
        const cxt = this.context
        let [x0, y0, x1, y1] = this.shrink(_x0, _y0, _x1, _y1)
        y0 += 10
        y1 += 10
        const cpx = (x0 + x1) / 2
        const cpy = (y0 + y1) / 2 + 200
        cxt.beginPath()
        cxt.moveTo(x0, y0)
        cxt.quadraticCurveTo(cpx, cpy, x1, y1)
        cxt.stroke()
        this.drawArrow(x1, y1, this._calAngle(cpx, cpy, x1, y1))
    }

    drawArrow(x, y, angle) {
        const cxt = this.context
        cxt.save()
        cxt.translate(x, y)
        cxt.rotate(angle)
        cxt.beginPath()
        cxt.moveTo(-3, -3)
        cxt.lineTo(0, 0)
        cxt.lineTo(-3, 3)
        cxt.stroke()
        cxt.restore()
    }

    _calAngle(x0, y0, x1, y1) {
        const dx = x1 - x0
        const dy = y1 - y0
        const pi = Math.PI
        if (dx === 0) {
            if (dy > 0) return 90 * pi / 180
            else return 270 * pi / 180
        } else {
            let offset = 0
            if (dy >= 0 && dx > 0) offset = 0
            if (dy <= 0 && dx > 0) offset = 2 * pi
            else if (dy <= 0 && dx < 0) offset = pi
            else if (dy >= 0 && dx < 0) offset = pi
            const ratio = (dy / dx < 0 ? -1 : 1) * Math.asin(Math.abs(dy) / Math.sqrt(dx * dx + dy * dy))
            return ratio + offset
        }
    }

    /**
     * draw the cursor pointer
     * @param {ListNode} node
     * @param {boolean} down
     * @param {boolean} clear
     */
    drawCursor(node, down = true) {
        const { x, y } = node.dataset.xy
        const y0 = down ? y - this.r - 20 : y + this.r + 20
        const path = [x - 6, y0, x, y0 + (down ? 10 : -10), x + 6, y0]
        const cxt = this.context
        cxt.beginPath()
        cxt.moveTo(path[0], path[1])
        cxt.lineTo(path[2], path[3])
        cxt.lineTo(path[4], path[5])
        cxt.closePath()
        cxt.stroke()
    }

    clearCursor(node, down) {
        const cxt = this.context
        cxt.save()
        cxt.lineWidth = 2
        cxt.strokeStyle = 'white'
        this.drawCursor(node, down)
        cxt.restore()
    }

    /**
     * concat with a ListNodeCircle
     * @param {ListNodeCircle} circle
     * @param {boolean} curve
     */
    concat(circle, curve = false) {
        const { x: x0, y: y0 } = this.xygen
        const { x: x1, y: y1 } = circle
        if (curve) {
            this.curve(x0, y0, x1, y1)
        } else {
            this.line(x0, y0, x1, y1)
        }
    }

    linear(x0, y0, x1, y1) {
        return x => {
            if (y0 === y1) return y0
            else if (x0 === x1) return 0
            else {
                const raito =(y1 - y0) / (x1 - x0)
                return (x - x0) * raito + y0
            }
        }
    }

    shrink(x0, y0, x1, y1) {
        const y = this.linear(x0, y0, x1, y1)
        const d = this.r + 6
        if (x1 > x0) {
            return [x0 + d, y(x0 + d),  x1 - d, y(x1 - d)]
        } else {
            return [x0 - d, y(x0 - d),  x1 + d, y(x1 + d)]
        }
    }

    /**
     * do animation
     * @param {boolean} down 
     * @param {number} steps
     * @param {Function} stream
     */
    animate(down, steps, stream) {
        const g = this.node[Symbol.iterator]()
        let lastValue = null
        return () => {
            // todo
            let done = false, value = null
            for (let i = 0; i < steps; i ++) {
                const r = g.next()
                done = r.done
                value = r.value
            }
            if (done) {
                return null
            }
            if (lastValue) {
                this.clearCursor(lastValue, down)
            }
            this.drawCursor(value, down)
            stream(value)
            lastValue = value
            return value
        }
    }
}

/**
 * make Canvas HD by devicePixelRatio
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} context
 * @param {number} visualW
 * @param {number} visualH
 */
function makeCanvasHD(canvas, context, visualW, visualH) {
    const dpr = window.devicePixelRatio
    canvas.width = Math.floor(visualW * dpr)
    canvas.height = Math.floor(visualH * dpr)
    canvas.style = `width: ${visualW}px; height: ${visualH}px`
    context.scale(dpr, dpr)
}

function animate(work, freq) {
    let buffer = 0
    const zone = () => {
        buffer += 1
        if (buffer === freq) {
            buffer = 0
            work()
        }
        requestAnimationFrame(zone)
    }
    requestAnimationFrame(zone)
}

/**
 * main
 * @param {HTMLDivElement} container 
 */
function main(container) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    container.appendChild(canvas)
    makeCanvasHD(canvas, context, container.clientWidth, container.clientHeight)
    context.translate(300, 100)
    context.lineWidth = 1
    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.lineJoin = 'round'

    const circleA = new ListNodeCircle(la, context, 0, 0)
    circleA.render(shared)
    const circleB = new ListNodeCircle(lb, context, 0, 60)
    circleB.render(shared)
    const circleS = new ListNodeCircle(shared, context, Math.max(circleA.xygen.x, circleB.xygen.x) + 200, 30)
    circleS.render()
    circleA.concat(circleS)
    circleB.concat(circleS)
    circleS.concat(circleB, true)

    shared.concat(lb)

    const noop = () => {}

    const doWorkA = circleA.animate(true, 8, noop)
    const doWorkB = circleB.animate(false, 1, noop)

    animate(() => {
        const nodeA = doWorkA()
        const nodeB = doWorkB()
        if (nodeA === nodeB) {
            console.log('meet @ ' + nodeA.val)
        }
    }, 60)
}