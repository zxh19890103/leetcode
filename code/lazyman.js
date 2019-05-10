/**
 * 实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。
 */

 // 思路一：使用 Promise
 /**
  * 设计一个大对象，它包含了以下函数属性：
  * 
  * hi(name: String)
  * sleep(t: Number)
  * sleepFirst(t: Number)
  * eat(what: String)
  * 
  * 每个函数返回该对象本身。
  * 
  * 函数内部：包装上一个函数调用产生的 promise
  */

const delay = (time) => {
    return new Promise(r => {
        setTimeout(() => {
            r(true)
        }, time)
    })
}

const LazyManObj = {
    _todos: [],
    hi(name) {
        this._todos.push((next) => {
            console.log(`Hi This is ${name}!`)
            next()
        })
        return this
    },
    sleep(t) {
        this._todos.push(async (next) => {
            await delay(t * 1000)
            console.log(`Wake up after ${t}s!`)
            next()
        })
        return this
    },
    sleepFirst(t) {
        this._todos.unshift(async (next) => {
            await delay(t * 1000)
            console.log(`Wake up after ${t}s!`)
            next()
        })
        return this
    },
    eat(what) {
        this._todos.push((next) => {
            console.log(`Eat ${what}!`)
            next()
        })
        return this
    },
    next(i) {
        const todo = this._todos[i]
        if (todo === undefined) return
        todo(() => {
            this.next(i + 1)
        })
    }
}

function LazyMan (name) {
    // run in next loop
    setTimeout(() => {
        LazyManObj.next(0)
    }, 0)
    return LazyManObj.hi(name)
}

LazyMan('Hank').sleep(5).eat('breakfast').sleep(10).eat('meal')