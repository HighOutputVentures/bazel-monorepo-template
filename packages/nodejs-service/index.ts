import Koa from 'koa';
import Router from '@koa/router';
import { encode, decode } from '@bazel-monorepo-template/nodejs-dependency';
import logger from './library/logger';

const app = new Koa();

const router = new Router();

router.get('/encode', async (ctx) => {
  const { input, encoding } = ctx.request.query as { input: string, encoding: 'utf8' | 'base64' | 'hex' };

  ctx.body = encode(Buffer.from(input, encoding));
});

router.get('/decode', async (ctx) => {
  const { input, encoding } = ctx.request.query as { input: string, encoding: 'utf8' | 'base64' | 'hex' };

  ctx.body = decode(input).toString(encoding);
});

app.use(router.allowedMethods());
app.use(router.routes());

const port = parseInt(process.env.HTTP_PORT || '8080', 10);
app.listen(port);

logger.info(`server listening at port ${port}`);
