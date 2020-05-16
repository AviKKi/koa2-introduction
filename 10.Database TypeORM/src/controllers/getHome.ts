import { Context } from 'koa'
import { getManager } from 'typeorm'
import { BlogPost } from '../entity/BlogPost'

const getHome = async (ctx: Context) => {
    const postRepository = getManager().getRepository(BlogPost)
    const allPosts = await postRepository.find()
    await ctx.render('index', { allPosts })
}

export default getHome