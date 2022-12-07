import Router from 'koa-router';
import FileRouter from './files';
import HealthRouter from './health';

const router = new Router({ prefix: '/v1'});
router.use('', FileRouter);
router.use('', HealthRouter);

export default router.routes();
