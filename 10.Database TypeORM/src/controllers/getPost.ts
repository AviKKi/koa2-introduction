import { Context } from 'koa'
import { getManager } from 'typeorm'
import { BlogPost } from '../entity/BlogPost'

const getPost = async (ctx: Context) => {
    const { id } = ctx.params
    const postRepository = getManager().getRepository(BlogPost)
    let post = await postRepository.findOne({ id })
    
    if (post === undefined) {
        post = new BlogPost()
        post.title = "404 Not found"
        post.content = "Post you are looking for was not found in the database."
    }
    
    await ctx.render('post', { post })
}

export default getPost