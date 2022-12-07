import Router from 'koa-router';
import multer from '@koa/multer';
import Redis from 'ioredis';
import { storeFile } from '../controllers/fileController';

const router = new Router();

router.post('/file', storeFile);


export default router.routes();
