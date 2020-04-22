const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Add content-type header
app.use(async (ctx, next)=>{
    ctx.set('Content-Type','application/json')
    await next()
})

// response

app.use(async ctx => {
  ctx.body = '{"message":"Hello World"}';
});

app.listen(3000, ()=>console.log('listening on 3000'));