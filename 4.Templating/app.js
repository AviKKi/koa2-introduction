const Koa = require('koa')

app = new Koa();

app.use(
    ctx => ctx.body = 'hello world'
)

app.listen(3000, () => console.log("listening on localhost:3000"));