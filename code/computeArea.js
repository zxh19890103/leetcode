/**
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
function Point(x, y) {
    this.x = x
    this.y = y
}

function Rec(bl, tr) {
    this.bl = bl
    this.tr = tr
    this.area = (tr.y - bl.y) * (tr.x - bl.x)
}

Rec.prototype.isValid = function() {
    return this.tr.y > this.bl.y && this.tr.x > this.bl.x
}

Rec.prototype[Symbol.iterator] = function* () {
    let x = 0
    let y = this.tr.y
    while (y > this.bl.y) {
        y --
        x = this.bl.x
        while (x < this.tr.x) {
            yield { x, y }
            x += 1
        }
    }
}

/**
 * get the inter section.
 * @param {Rec} rec
 */
Rec.prototype.intersec = function(rec) {
    const p0 = new Point(Math.max(this.bl.x, rec.bl.x), Math.max(this.bl.y, rec.bl.y))
    const p1 = new Point(Math.min(this.tr.x, rec.tr.x), Math.min(this.tr.y, rec.tr.y))
    const interSecRect = new Rec(p0, p1)
    if (interSecRect.isValid())
        return interSecRect.area
    else
        return 0
}

var computeArea = function(A, B, C, D, E, F, G, H) {
    const rec0 = new Rec(new Point(A, B), new Point(C, D))
    const rec1 = new Rec(new Point(E, F), new Point(G, H))
    const s = rec0.intersec(rec1)
    const r = rec0.area + rec1.area - s
    return r
}

const a = computeArea(-3, 0, 3, 4, 0, -1, 9, 2)
console.log(a)