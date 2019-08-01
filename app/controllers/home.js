class HomeCtl {
  index(ctx) {
    ctx.body = "这是主页呀";
  }
}

module.exports = new HomeCtl();
