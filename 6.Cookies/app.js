const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
    let name = 'Stranger'
    let queryName = ctx.query['name']
    if(queryName!==undefined)
    {
        name = queryName
        ctx.cookies.set('name', name)
    }else{
        name = ctx.cookies.get('name') || name
    }
    ctx.body = `
        <h1>Hello, ${name}</h1>
        <form method="GET" action="/">
            Name: <input type="text" name="name" />
            <input type="submit" value="change name" />
        </form>
    `
})

app.listen(3000, () => console.log("listening on port 3000"))