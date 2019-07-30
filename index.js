const Koa = require('koa');
const app = new Koa();

app.use(async (ctx)=>{
    if( ctx.url === '/' ) {
        ctx.body = "hello world "
    } else if ( ctx.url ==='/users' ) {
        if( ctx.method === "GET" ) {
            ctx.body = "这是用户列表"
        } else if ( ctx.method === "POST" ) {
            ctx.body = "创建用户"
        } else {
            ctx.status = 405
        }
        
    } else if ( ctx.url.match(/\/users\/\w+/)) {
        const userId = ctx.url.match(/\/users\/(\w+)/)[1];
        ctx.body = `这个用户id是${userId}`;
    } else {
        ctx.status = 404
    }
    
    
});
//中间件
// app.use(async (ctx)=>{
//     console.log(2)
// })
app.listen(3000);