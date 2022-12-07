import Router from "koa-router";

const router = new Router;

router.get('/health', async (ctx, next) => {
    ctx.body = { msg: "Ok" };
    await next();
});

export default router.routes();
