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
    "dev": "nodemon --watch 'src/' -e ejs,ts --exec 'ts-node src/index.ts'"
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
todo- do it later