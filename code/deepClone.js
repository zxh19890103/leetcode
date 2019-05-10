function clone(to, from) {
    if (isEqual(to, from)) return // Primary value includes Date.
    if (isArray(from)) cloneArray(to, from) // Array
    else cloneObj(to, from) // Object
}

function cloneObj(to, from) {
    Object.keys(from).forEach(key => {
        const value = from[key]
        const newVal = alloc(value)
        to[key] = newVal
        clone(newVal, value)
    })
}

function cloneArray(to, from) {
    from.forEach(value => {
        const newVal = alloc(value)
        to.push(newVal)
        clone(newVal, value)
    })
}

function isCloneable(from) {
    return !(from === null ||
        'number,boolean,bigint,string,function,undefined,'.indexOf(typeof from) > -1)
}

function isDate(from) {
    return from instanceof Date
}

function isArray(from) {
    return Array.isArray(from)
}

function isEqual(val, newVal) {
    return val === newVal || val - newVal === 0
}

function alloc(value) {
    if (isCloneable(value)) {
        if (isArray(value)) return []
        else if (isDate(value)) return new Date(value)
        else return {} 
    } else {
        return value
    }
}

const to = {}
const from = {
    name: 'Singhi',
    age: 30,
    address: ['China', 'Hubei', 'Huanggang', 'Xishui', 'Bahe', 'Luhua', { doorNo: 13490 }],
    say() {
        console.log('say')
    },
    birth: new Date(1989, 1, 8),
    note: null
}

clone(to, from)

console.log(to)

const to = [] // or value is not an object
const from = { name: 'Singhi' }
clone(to, from)

const to = { } // or value is not an array
const from = [ { name: 'Singhi' } ]
clone(to, from)

const to = { }
const from = new Date() // or other primary value.
clone(to, from)