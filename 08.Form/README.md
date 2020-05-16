todo: finish this tutorial content
```js
const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

app.use(koaBody())

app.use(ctx => {
    if (ctx.method === "GET")
        ctx.body = `
        <form method="POST" action="/">
            Name:<input type="text" name="name"/>
            Age:<input type="text" name="age"/>
            <input type="Submit">
        </form>
    `
    else {
        const form = ctx.request.body
        ctx.body = `Hello ${form.name}, you are ${form.age} years old.`
    }
})

app.listen(3000, () => console.log("listening at 3000"))
```