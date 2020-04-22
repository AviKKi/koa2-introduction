const path = require('path')
const views = require('koa-views')
const Koa = require('koa')

app = new Koa()

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }))

app.use(
    async ctx => await ctx.render('index')
)

app.listen(3000, () => console.log("listening on localhost:3000"))