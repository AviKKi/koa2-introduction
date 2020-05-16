# Databse - TypeORM

TypeORM is a Object Relation Mapper 
todo: write some more intro

### What are we making this time?
We have already made a todo app and repeating it would be boring. So we are going to create a simple blog this time.


### Creating koa app
We'll use typescript in this tutorial, as it works best with TypeORM, JS is also supported but that is just a bit hackish method. 

This tutorial will be a bit bigger than our previous ones, as we are going to create a neat project with some nice directory stucture, and a lot of middlewares, we'll be repeating what we have already done in our previous tutorial you can skip it and clone my boilerplate instead.

`$ git clone https://github.com/AviKKi/`

todo: upload my boilerplate

Giving it a quick read won't be a harm ;)

<details>
  <summary> Read detailed tutorial </summary>

#### Create a `hello-world` app
Intialize a project

`$ yarn init -y`

Install all dependencies

` $ yarn add koa nodemon typescript ts-node`
 - `typescript` this is required to transpile .ts files to .js
 - `ts-node` is required to run typescript files directly without explicitly compiling them to js

`$ yarn add -D @types/koa`
typescript defination for koa, this will add nice typechecking and autocomplete for the developer, `-D` means it is a dev dependency and won't be required in production to run the app.

In file `src\app\index.ts`
```js
import * as Koa from 'koa';


const app:Koa = new Koa()

app.use( ctx => ctx.body = "Hello World!!" )

export default app
```
As you can see we are now exporting our app instead of running it, this makes testing and production much easier.

Now create a file where we actully listen for connections
```js
import app from './app'


app.listen(3000, () => console.log('Listening at port 3000'))
```

In package.json add dev script
```json
{
  "name": "database-typeorm",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "koa": "^2.11.0",
    "nodemon": "^2.0.3",
    "ts-node": "^8.9.1",
    "typescript": "^3.8.3"
  },
  "devDependencies": {
    "@types/koa": "^2.11.3"
  },
  "scripts": {
    "dev": "nodemon --watch 'src/' -e ejs,ts --exec ts-node src/index.ts"
  }
}
```
Now run it to see everything is working fine

`$ yarn dev`

If you see `Listening at port 3000` in your browser and `Hello World!!` in your browser you are doing great.

### Adding middlewares
Now we'll add some middlewares for extra features required

`$ yarn add koa-router koa-body koa-views ejs`
- `koa-router`, we need multiple routes, homepage, create blog post, display blog post
- `koa-body`, parse multipart request body when a blog post is created with `POST` request
- `koa-views`, we'll keep our HTML/Views seperate from our logic code
- `ejs` templating engine we are going to use

`$ yarn add -D @types/koa-router @types/koa-views`

these are typescript defination for each module

This app will follow a much better structure than previous apps,
```
src
├── app
├── controllers
├── views
├── index.ts
└── routes.ts
```
Here we see `src` folder has 3 folders
- `app` it exports koa app instance
- `controller` if you remember from `routing` tutorial, a JS function is assigned to each route/url of our website, each of those functions are called controller and will now be in a seprate file
- `views` we have already seen that we store .ejs templates in a folder named view.

and 2 files `index.ts` and `routes.ts`
- `index.ts` you may also name it `server.js` what this file basically does is imports koa instance and serves it.
- `routes.ts` this file specifies which url will trigger which function from controller files.

This structure will work great for small and medium size projects but you may want to further group `views` and `controller` into seperate related folder ex- a folder `user` and all views and controller of user will be inside that folder. It's best to adopt a community tested boilerplate, we'll learn how to use such boilerplates later.

Now let's add all the code,
`views\index.ejs`
```html
<h1>Home Page</h1>
```
`controllers\getHome.ts`
```ts
import { Context } from 'koa'

const getHome = (ctx: Context) => {
    ctx.render('index')
}

export default getHome
```
`controller\index.ts`
```ts
export { default as getHome } from './getHome'
```
this file surves just as a good interface to `controllers` module, we can import all controllers in one line now, ex - 

```js
import { getHome, getBlogPost } from './controllers'
``` 
instead of
```js
import getHome from './controllers/getHome'
import getBlogPost from './controllers/getBlogPost'
```

In file `src/routes.js`
```ts
import { getHome } from "./controllers";

export const AppRoutes = [
    {
        'path': '/',
        'method': 'GET',
        'action': getHome
    },
]
```
This file contains all the detail of all the routes in our app.

Now let's add all the middlewares and we are done for this section, import middlewares in `src\app\index.ts` 
```ts
import * as Router from 'koa-router'
import * as koaBody from 'koa-body'
import * as views from 'koa-views'
import path from 'path'

import { AppRoutes } from '../routes'
```


- Add body parser
```ts
app.use(koaBody())
```
- Add Template engine
```ts
app.use(views(path.join(__dirname, '../views'), { extension: 'ejs' }))
```
- Add router
```ts
const app: Koa = new Koa()

const router = new Router()
// Register each app route
AppRoutes.forEach(
    route => router[route.method](route.path, route.action)
)

app.use(router.routes())
```

Now open your browser to see if everything is working fine, and voila you are almost halfway through the tutorial.

</details>

### Adding persistance   
Install dependencies
`$ yarn global add typeorm`

Now intialize your project
`$ typeorm init --name [MyProject] --database sqlite`
replace [MyProject] with name of your folder

Now few extra files would be added to our directory
```
MyProject
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options
```
This does reset `src\index.js` file but there wasn't much code anyways so I'll fix it later

Install the dependencies
`$ yarn install`

Update the code, delete file `src/entity/User.ts` as we won't need it, and update `src/index.ts` as follows
```js
import "reflect-metadata";
import { createConnection } from "typeorm";

import app from './app'

createConnection().then(async connection => {

    app.listen(3000, () => console.log("listening at port 3000"))

}).catch(error => console.log(error));
```

Here we have created a connection to the databse and running the server if connection was succesful else we log the error.

Now let's create some tables, How do we create a table in an ORM? by creating a class, so we'll create a BlogPost class `src\entity\BlogPost.ts`
```ts
export class BlogPost { 
  id: number
  title: string
  content: string
  isPublished: boolean
}
```
In TypeORM not every class is a table in database only classes decorated with `@Entity` decorater are tables, same for columns, decorate them with `@Column`.
```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BlogPost { 
  
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
  
  @Column()
  content: string
  
  @Column()
  isPublished: boolean
}
```
The decorator `@PrimaryGeneratedColumn` defines a primary key column which will be auto-incremented.

Inserting something to the database, in our `src\index.ts` we can add something use the connection to add something to the database
```ts
import "reflect-metadata";
import { createConnection } from "typeorm";

import app from './app'
import { BlogPost } from './entity/BlogPost'

createConnection().then(async connection => {
    let post = new BlogPost()
    post.title = "A intro to TypeORM"
    post.content = "read the README :P"
    post.isPublished = false

    await connection.manager.save(post)
    console.log(`post saved with id ${post.id}`)
    
    app.listen(3000, () => console.log("listening at port 3000"))

}).catch(error => console.log(error));
```

If you run your server now you'll see this in the console
```
post saved with id 1
listening at port 3000
```
Restarting the server will increment the id, also you'll see a new `database.sqlite` file

Note here that we have directly used the `connection.manager` which is not very good method, we'll `repositories` later in this section with `getRepository` method.

Next we are going to create a view to list all posts, create a blog post and read a specific post.
#### List Post View
`src/controllers/getHome.ts`
```ts
import { Context } from 'koa'
import { getManager } from 'typeorm'
import { BlogPost } from '../entity/BlogPost'

const getHome = async (ctx: Context) => {
    const postRepository = getManager().getRepository(BlogPost)
    const allPosts = await postRepository.find()
    await ctx.render('index', { allPosts })
}

export default getHome
```
In typeORM we have `EntityManager` that can create, read, update, delete any entity, what we used earlier but here we are using `Repository` they are like `EntityManager` but operate around only one entity.

All queries on BlogPost table can be done with `postRepository`, doing a `postRepository.find()` is same as SQLs `SELECT *` i.e. we get all the posts, in production you would like to limit it to some number.

Update the home template to show the blogposts and I have included some styling too.
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome Blog</title>
    <style>
        body {
            margin: 0px;
            height: 100vh;
            display: flex;
        }

        h1 {
            font-family: sans-serif;
            color: #3D3D3D;
        }

        .section {
            flex: 1;
        }

        #left-section {
            background: url('https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=80') no-repeat;
        }

        #left-section h1 {
            padding: 0 0.5em;
            font-size: 3em;
        }

        #right-section {
            padding: 25px;
            background-color: lightcyan;
        }

        #create-btn {
            text-decoration: none;
            background-color: bisque;
            padding: 10px 20px;
            border: 1px solid transparent;
            border-radius: 5px;
            color: purple;
            float: right;
        }
    </style>
</head>

<body>
    <div class="section" id="left-section">
        <img style="position: absolute;" src="">
        <h1>An Awesome Blog</h1>
    </div>
    <div class="section" id="right-section">
        <a id="create-btn" href="/create">
            Create a Post
        </a>
        <h1 style="font-size:2.3em">Blog Posts</h1>
        <% for(var i=0; i<allPosts.length; i++) {%>
        <a href="post/<%=  allPosts[i].id %>">
            <h3><%= allPosts[i].title %></h3>
        </a>
        <% } %>
    </div>
</body>

</html>
```
that is a lot of code but most important part is, where we loop through allPosts and show each one in a hyperlink tag, users are only shown `BlogPost.title`, with url `post/<BlogPost.id>`
```
     <% for(var i=0; i<allPosts.length; i++) {%>
        <a href="post/<%=  allPosts[i].id %>">
            <h3><%= allPosts[i].title %></h3>
        </a>
        <% } %>
```

#### Blog post page
Now we need a page where blog posts can be read, create a new template `src\views\post.ejs` 
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome Blog</title>
    <style>
        body {
            margin: 0px;
            height: 100vh;
            display: flex;
        }

        h1 {
            font-family: sans-serif;
            color: #3D3D3D;
        }

        .section {
            flex: 1;
        }

        #left-section {
            background: url('https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=80') no-repeat;
        }

        #left-section h1 {
            padding: 0 0.5em;
            font-size: 3em;
        }

        #right-section {
            padding: 25px;
            background-color: lightcyan;
        }

        #create-btn {
            text-decoration: none;
            background-color: bisque;
            padding: 10px 20px;
            border: 1px solid transparent;
            border-radius: 5px;
            color: purple;
            float: right;
        }
    </style>
</head>

<body>
    <div class="section" id="left-section">
        <img style="position: absolute;" src="">
        <h1>An Awesome Blog</h1>
    </div>
    <div class="section" id="right-section">
        <a id="create-btn" href="/create">
            Create a Post
        </a>
        <h1 style="font-size:2.3em"> <%= post.title %> </h1>
        <p>
            <%= post.content %>
        </p>
    </div>
</body>

</html>
```
It is same as our `index.ejs` even simpler as we have only one object, we are just printing the blog title and content.

Add a new route for this new view at `src/routes.ts`
```ts
import { getHome, getPost } from "./controllers";

export const AppRoutes = [
    {
        'path': '/',
        'method': 'get',
        'action': getHome
    },{
        'path': '/post/:id',
        'method': 'get',
        'action': getPost
    },
]
```
The path here `/post/:id` is special type of url where the id is an variable it can be anything `/post/1`
 `post/jellies`.

But we still don't have a `getPost` controller so let's create it, add file `src\controllers\getPost.ts`
```ts
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
```
The `id` in the url can be accessed with `ctx.params.id`. Instead of `.find` we are using `.findOne` to search for the post as only a single result is required, if multiple rows are matched only the first is returned, `.find` returns an array while `findOne` will only return a single array.

When no result is found `.findOne` method will return undefined, in that case we are creating a post with custom title and content to make sure app doesn't crash, a better approach would be redirecting user to a `404 page` or render a template that shows `404 Page not found`, try doing that later.

#### Create a blog post
Finally we'll create a blogpost then we'll be done for this section, add a template `src/view/create.ejs`
```html
```

Create a controller for this view now, `src/controllers/getPostCreate.ts`
```ts

```

Add the url to routes
```ts
{
    'path': '/create',
    'method': 'get',
    'action': getPostCreate
},{
    'path': '/create',
    'method': 'post',
    'action': getPostCreate
},
```
Note how we are adding two entries for get and post and for same view, inside the view we've checked the request method.

todo- finish `Create a blog post`


#### What to do next?
1. Read more about [typeORM](https://typeorm.io/) they have wonderful docs.
1. Add features to edit and delete a post.
1. Add pagination to the home page, where all posts are listed.
1. Add a base template as all pages share a lot of html code.
