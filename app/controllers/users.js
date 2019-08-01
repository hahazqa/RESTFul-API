const db = [
  {
    name: "张三"
  }
];
class UsersCtl {
  find(ctx) {
    ctx.body = db;
  }
  findById(ctx) {
    if (parseInt(ctx.params.id) >= db.length) {
        ctx.throw(412,'先决条件失败');
    }
    ctx.body = db[parseInt(ctx.params.id)];
  }
  create(ctx) {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }
  update(ctx) {
    db[parseInt(ctx.params.id)] = ctx.request.body;
    ctx.body = ctx.request.body;
  }
  delete(ctx) {
    db.splice(parseInt(ctx.params.id), 1);
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();
