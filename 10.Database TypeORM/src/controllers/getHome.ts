import { Context } from 'koa'

const getHome = async (ctx: Context) => {
    await ctx.render('index')
}

export default getHome