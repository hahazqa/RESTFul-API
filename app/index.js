const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const app = new Koa();
const routing = require("./routes");
const { connectionStr } = require('./config');

//连接数据库
mongoose.connect(connectionStr,{ useNewUrlParser: true },()=> console.log("连接成功了。"));
mongoose.connection.on('error',console.error);

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

app.use(bodyparser());
app.use(parameter(app));
routing(app);

app.listen(3000, () => {
  console.log("程序启动在3000端口了");
});
