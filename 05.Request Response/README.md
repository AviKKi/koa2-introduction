# Request and Response
todo: complete this part

In any web framework there are two basic objects Request and Response, request is what we get from the browser of person visiting our wesbite, or an android app loading data from the backend, response object is what we create at the backend and then finally send to the client.

These `Request` and `Response` objects are compiled as a single `Context` by koa, what we have as our function parameter `ctx`.

In this part we'll just inspect these objects by logging them on the `console`.
```js
const Koa = require('koa')

const app = new Koa()

app.use(
    ctx => {
        console.log(ctx.request)
        ctx.body = "Hello World"
        console.log(ctx.response)
    }
)

app.listen(3000, () => console.log("listening at port 3000"))
```
If you run the above code and `http://localhost:3000` in your browser you'll see these objects in your console.

```
[nodemon] starting `node app.js`
listening at port 3000
{ method: 'GET',
  url: '/',
  header:
   { host: 'localhost:3000',
     'user-agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
     accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
     'accept-language': 'en-US,en;q=0.5',
     'accept-encoding': 'gzip, deflate',
     dnt: '1',
     connection: 'keep-alive',
     'upgrade-insecure-requests': '1',
     'cache-control': 'max-age=0' } }
{ status: 200,
  message: 'OK',
  header:
   [Object: null prototype] {
     'content-type': 'text/plain; charset=utf-8',
     'content-length': '11' },
  body: 'Hello World' }
```
The block starting with `'method': 'GET',` is a request object, and you can see the second object is a response object with our `Hello World` body.

Most properties of request and response can be accessed directly from `context` object, you may have already observed that we set `ctx.response.body` by using `ctx.body`

Below table summarises `request` and `response` objects attributes, their use and `context` alias.
