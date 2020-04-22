# Templating
We have till now only made websites which were basically black text on white page, to make beautiful websites we can make `ctx.body` a string of HTML and CSS like `ctx.body = '<p style="color: aqua;"> Colourfull text!! </p>'` but all that code in your app.js file would just create a lot of mess and also we'll have to dynamically change content of the webpage sometimes, which will be very hard using string manipulation.

So we'll use a template system to seperate all HTML files in a folder called `views`, template systems like `pug` or `EJS` also have special features like conditional code (if else), loops, and `pug` makes it very convinient to write HTML.

In this tutorial we'll be using `EJS`. 

As usual initialize a basic hello world project with following code

```js
const Koa = require('koa')

app = new Koa();

app.use(
    ctx => ctx.body = 'hello world'
)

app.listen(3000, () => console.log("listening on localhost:3000"));
```

Now we need to install some middlewares.
    `yarn add koa-views ejs`

`koa-views` middleware supports a lot of template engines, and provides a unified interface for all of them. Here we'll be learning `ejs` (Embedded JavaScript).

Now import this middleware in `app.js`

```js
const path = require('path'); // path is required to resolve path of views folder
const views = require('koa-views');
```

add this middleware to the app

```js
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
```
We have now succesfully added a template engine to our app, what this means is use `views`(`koa-views`) middleware with all the template files in `/views` folder and of `ejs` type.

In the ctx object we now have a new attribute `ctx.render`, we'll use this attribute to render out template later. But first lets create it, create file `views/index.ejs`

```html
<html>
    <head><title>Templates</title></head>
    <body>
        <h1>Hello, world</h1>
    </body>
</html>
```

now use this template by changing our `hello world` function to use `render` method. ( `ctx.render` returns a Promise so we had make this an `async` function and `await` for the `.render` method )

```js
app.use(
    async ctx => await ctx.render('index')
)
```


Till now your `app.js` should look like

```js
const path = require('path')
const views = require('koa-views')
const Koa = require('koa')

app = new Koa()

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }))

app.use(
    async ctx => await ctx.render('index')
)

app.listen(3000, () => console.log("listening on localhost:3000"))
```


Open up your browser and voilà we have some HTML there, we can use this technique to create any number of pages required. But there is much more to templates.

### Injecting data into templates
It it pretty straight forward, `.render` method takes a second parameter that takes an object, attributes of that object will be available in the template, let's try to pass our name.

```js
app.use(
    async ctx => await ctx.render('index', {name: 'AviKKi'})
)
```

now we can access name in the template, 
```html
<h1>Hello, <%= name %> </h1>
```
This new looking syntax `<%= name %>` us actually an `ejs tag` it is used to output something to the HTML shown on the browser, anything between `<%=` and `%>` is javascript, try adding this code `<%= 2+2 %>` or `<%= name.toUpperCase() %>`

These are ejs tags 


| Tag | Description                                                          |
|-----|----------------------------------------------------------------------|
| <%  | 'Scriptlet' tag, for control-flow, no output                         |
| <%_ | ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it |
| <%= | Outputs the value into the template (HTML escaped)                   |
| <%- | Outputs the unescaped value into the template                        |
| <%# | Comment tag, no execution, no output                                 |
| <%% | Outputs a literal '<%'                                               |
| %>  | Plain ending tag                                                     |
| -%> | Trim-mode ('newline slurp') tag, trims following newline             |
| _%> | ‘Whitespace Slurping’ ending tag, removes all whitespace after it    |

You can find some more ejs examples [here]('https://github.com/mde/ejs/tree/master/examples')