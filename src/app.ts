import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Path from 'path';
import * as Nunjucks from 'koa-nunjucks-2';
import * as Static from 'koa-static';
import * as KoaBody from 'koa-body';
import * as koaView from 'koa-views';
import * as BodyParser from 'koa-bodyparser';
import Fileupload from './fileupload';
import GetFile from './getFile';
import config from '../config/config';
import log from './log';

const app = new Koa();
const router = new Router();

app.use(log.koaLog.koaLogger(log.http, { level: 'trace' }));

app.use(Static(Path.resolve(process.cwd(), 'public')))

app.use(koaView(Path.resolve(process.cwd(), 'views')));

app.use(BodyParser())

app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 1000 * 1024 * 1024
  }
}))


router.post('/upload',async (ctx) => {
  ctx.body = Fileupload.saveFile(ctx.request.files);
});

router.get('/file/:filename', async (ctx) => {
  const ext = ctx.params.filename.split('.').pop();
  ctx.type = ext;
  ctx.body = await GetFile.downloadFile(ctx, ctx.params.filename, ctx.request.query, ext);
})

router.get('/', async (ctx) => {
  await ctx.render('index');
});

app.use(router.routes());

app.listen(config.port);

console.log(`server running on port ${config.port}`)