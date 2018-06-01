require('./env');

import koa from 'koa';
import koaMount from 'koa-mount';
import koaHelmet from 'koa-helmet';
import koaLogger from 'koa-pino-logger';
import koaCompress from 'koa-compress';
import koaEtag from 'koa-etag';
import koaCors from '@koa/cors';

// import top level middlewares
import {
    errorHandler,
    requestLogger
} from './middlewares';

// import all modules
import {
    quotesApp
} from '@modules';

// create new base app to host and mount other apps
const name = 'forismatic-proxy';
const app = new koa();
const PORT = process.env.PORT;

// use compress middleware for gzip compression
app.use(koaCompress());
// use etag middleware for HTTP Etags
app.use(koaEtag());
// use the helmet middleware, to offer a bit of extra security
app.use(koaHelmet());
// enable CORS
app.use(koaCors({ origin: '*', allowMethods: 'GET' }));
// init logging
const prettyPrint = process.env.NODE_ENV === 'development';
app.use(koaLogger({ name, prettyPrint }));
app.use(requestLogger);

// add global error handling
app.use(errorHandler);

// mount quote proxy app
app.use(koaMount('/', quotesApp));

// initialize the server
app.listen(PORT, () => {
    console.log(`forismatic proxy server started on port ${PORT}`);
});
