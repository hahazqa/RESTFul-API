const Koa = require('koa');
const app = new Koa();

app.use((ctx)=>{
    ctx.body = "hello world hahaha xixixi"
});
app.listen(3000);