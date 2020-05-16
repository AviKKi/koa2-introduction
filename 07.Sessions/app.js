const session = require('koa-session')
const Koa = require('koa')
const app = new Koa()

app.keys = ['some secret hurr']

const SESSION_CONFIG = {

}

app.use(session(SESSION_CONFIG, app))

app.use(ctx => {
    const visit_count = ctx.session.visit_count
    if (visit_count === undefined) {
        ctx.body = `Hello, this is your first visit to the website`
        ctx.session.visit_count = 1
    }
    else {
        ctx.body = `Hey there, you have visited this website for ${visit_count} time`
        ctx.session.visit_count+= 1
    }
})

app.listen(3000, () => console.log("Listening on port 3000"))