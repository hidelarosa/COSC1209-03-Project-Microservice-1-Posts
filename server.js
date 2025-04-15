const Koa = require('koa');
const Router = require('koa-router');
const db = require('./db.json');

const app = new Koa();
const router = new Router();


// Log requests
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

router.get('/api/posts/in-thread/:threadId', async (ctx) => {
  const id = parseInt(ctx.params.threadId);
  ctx.body = db.posts.filter((post) => post.thread === id);
});

router.get('/api/posts/by-user/:userId', async (ctx) => {
  const id = parseInt(ctx.params.userId);
  ctx.body = db.posts.filter((post) => post.user === id);
});

router.get('/api/', async (ctx) => {
  ctx.body = "API ready to receive requests";
});

router.get('/', async (ctx) => {
  ctx.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);

console.log('Worker started');
