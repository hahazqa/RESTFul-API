const Koa = require("koa");
const path = require("path");
const koaBody = require("koa-body");
const koaStatic = require("koa-static")
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const app = new Koa();
const routing = require("./routes");
const { connectionStr } = require('./config');

//连接数据库
mongoose.connect(connectionStr,{ useNewUrlParser: true },()=> console.log("连接成功了。"));
mongoose.connection.on('error',console.error);
mongoose.set('useFindAndModify', false);

//上传图片时返回http连接地址
app.use(koaStatic(path.join(__dirname, "public")));

app.use(error({
  postFormat:(e,{stack, ...rest})=>process.env.NODE_ENV === 'production' ? rest:{stack, ...rest}
}));
//捕获错误信息
// app.use(async(ctx,next)=>{
//   try {
//     await next();
//   } catch (error) {
//     ctx.status = error.status || error.statusCode || 500;
//     ctx.body = {
//       message:error.message
//     }
//   }
// })

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname,'/public/uploads'),
    keepExtensions: true
  }
}));
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
  console.log("程序启动在3000端口了");
});
