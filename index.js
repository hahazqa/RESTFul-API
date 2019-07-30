const Koa = require('koa');
const app = new Koa();

app.use((ctx)=>{
    ctx.body = "hello world hahaha xixixiffffr"
});
app.listen(3000);