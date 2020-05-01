const Koa = require('koa')
const knex = require('./db/knex')
const path = require('path')
const views = require('koa-views')

const app = new Koa()
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }))

app.use(async ctx => {
    const name = ctx.query.name
    let selectedTodos = ctx.query.id
    if (selectedTodos !== undefined) {
        // check if selectedTodos is an array,
        // if not make it an array
        if (!Array.isArray(selectedTodos))
            selectedTodos = Array(selectedTodos)

        // for selected todos
        await knex('todo')
            .update('is_done', 1)
            .whereIn('id', selectedTodos)

        // for unselected todos
        await knex('todo')
            .update('is_done', 0)
            .whereNotIn('id', selectedTodos)
    }
    if (name !== undefined)
        await knex('todo').insert({ name })
    const todos = await knex.select().from('todo')
    await ctx.render('index', { todos })
})

app.listen(3000, () => console.log('Listening on port 3000'))