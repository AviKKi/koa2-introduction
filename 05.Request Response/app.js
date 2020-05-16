const Koa = require('koa')

const app = new Koa()

app.use(
    ctx => {
        console.log(ctx.request)
        ctx.body = "Hello World"
        console.log(ctx.response)
    }
)

app.listen(3000, () => console.log("listening at port 3000"))
