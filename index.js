const Koa = require('koa');
const app = new Koa();

app.use((ctx)=>{
    ctx.body = "hello world hahaha xixixif"
});
app.listen(3000);