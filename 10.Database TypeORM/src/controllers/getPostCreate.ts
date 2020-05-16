import { Context } from 'koa'
import { getManager } from 'typeorm'
import { BlogPost } from '../entity/BlogPost'

const getPostCreate = async (ctx: Context) => {
    const postRepository = getManager().getRepository(BlogPost)
    let message: string

    if (ctx.method === 'GET')
        await ctx.render('create', { message })
    else {
        try {
            const post = await postRepository.create(ctx.body)
            await postRepository.save(post)
            message = "Post created"
        }
        catch (e) {
            console.error(e)
        }
        await ctx.render(
            'create',
            { message: message ? message : "Oops!! some error occured" }
        )
    }
}

export default getPostCreate