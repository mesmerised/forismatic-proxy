import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';

import { getQuote } from './middlewares';

const quoteApp = new koa();
const router = new koaRouter();

router.get('/', koaBody(), getQuote);

quoteApp.use(router.routes());
quoteApp.use(router.allowedMethods());

export default quoteApp;
