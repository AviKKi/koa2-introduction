# Cookies
Cookies are small piece of data that are sent from server to the browser and stored there, then it is sent with every subsequent request to the server. It helps keep track of users and also there preferences, consider these examples - 

1. When you go to a shopping site and add somthing to the cart, you can close the browser return back and cart still has those objects, where were they stored and how?
2. What you open a website and login into it, then untill you log out it recognizes you, is browser sending your username with every request?? 

For the shopping cart the ID or SKU of products can be stored in the cookies, or you can give user a special token(random string like '3794fgha43oibf3') that is key which will point to all his cart items in the server, this is called a `session` . We'll learn about sessions in the next tutorial. Here we are focusing on plain old cookies. 

### What we are building today?

We'll build a simple website that greets you, like `Hey, yourname` , it'll store your name in a cookie and if doesn't know you it'll just say `Hey, Stranger` . :)

Start with this code below 

``` js
const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
    let name = 'Stranger'
    ctx.body = `
        <h1>Hello, ${name}</h1>
        <form method="GET" action="/">
            Name: <input type="text" name="name" />
            <input type="submit" value="change name" />
        </form>
    `
})

app.listen(3000, () => console.log("listening on port 3000"))
```

Here we are only sending some static HTML as a response. Things to note here are default value of name variable is `Stranger`, later we'll try to load it from cookies, and we have a form to submit the name to server.

#### Using query params
Try to put yourname in the input field and press `Change Name` button, you'll see something like `?name=avikki` added to last of your url, this is a way of sending data to the server. This data can be accesed in server by `ctx.query`.
```js
app.use(ctx => {
    let name = 'Stranger'
    let queryName = ctx.query['name']
    if(queryName!==undefined)
    {
        name = queryName
    }
    ctx.body = `
        <h1>Hello, ${name}</h1>
        <form method="GET" action="/">
            Name: <input type="text" name="name" />
            <input type="submit" value="change name" />
        </form>
    `
})
```
`let queryName = ctx.query['name']`

We are storing the query param named `name` into a varible `queryName`, if no such query param was sent by the browser, `queryName` would be `undefined` so we are checking if it not undefined set `name` to `queryName`, and you'll see your name in your browser if you do it now.

But it's not persistent the moment you press back in your browser, you are again a stranger.
Now we'll set the `name` variable in a cookie.

```js
app.use(ctx => {
    let name = 'Stranger'
    let queryName = ctx.query['name']
    if(queryName!==undefined)
    {
        name = queryName
        ctx.cookies.set('name', queryName)
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
```
We are using the `ctx.cookies.set` method to set a cookie, a cookie has 2 parts key and value, you can store multiple cookies in a single browser, to uniquely identify them a `key` is used.
Here we have set a cookie with key `name` to `queryName`.And if no query name is recieved we'll try to get the name from the cookies.

`name = ctx.cookies.get('name') || name`

The above code is shorthand of
```js
if(ctx.cookies.get('name')!==undefined)
    name = ctx.cookies.get('name')
```
i.e. if cookies with key `name` is not undefined we'll set `name` equal to it or else it won't be changed.

Now you can visit `http://localhost:3000/` and see that your name is still there.(refresh the browser if you see `Stranger`)

Now try to open the same url in different windows, different browser and incognito mode; you'll understand how cookies works.

When setting a cookie there are several options you can set, as given below.
todo: complete this table