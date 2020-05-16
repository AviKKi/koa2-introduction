var Koa = require('koa');
var Router = require('koa-router');
var app = new Koa();

var router = Router();              //Instantiate the router
router.get('/', getHome);
router.get('/hello', getMessage);   // Define routes
router.get('/user/:id', getUser);
// router.get('/user/:id([0-9]+)', getUser); // with regex

async function getMessage(ctx) {
   ctx.body = "Hello world!";
};

async function getUser(ctx){
    ctx.body = `You are looking at user {user_id: ${ctx.params.id}}`;
}

async function getHome(ctx){
    ctx.body = "Home page <br/> <a href='/user/0'>Admin</a><br/><a href='/hello'>Message</a>"
    ctx.set('Content-type', 'text/html')
}

app.use(router.routes());           //Use the routes defined using the router
app.listen(3000);