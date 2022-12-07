import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import routes from './routes';

const app = new Koa();

// middleware
app.use(bodyParser());
app.use(logger())
app.use(cors({origin: 'http://localhost:3000'}));


// register routes
app
    .use(routes)
    .use(serve('./memes'))

export default app;
