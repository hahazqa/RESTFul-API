const Topic = require("../models/topics");
class TopicsCtl {
  async find(ctx) {
    //分页功能
    const { per_page = 10 } = ctx.query;
    const page = Math.max(parseInt(ctx.query.page), 1) - 1;
    const perPage = Math.max(parseInt(per_page), 1);
    ctx.body = await Topic.find()
      .limit(perPage)
      .skip(page * perPage);
  }
  async findById(ctx) {
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " +" + f)
      .join("");
    const topics = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topics;
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
      introduction: { type: "string", required: false }
    });
    const topics = await new Topic(ctx.request.body).save();
    ctx.body = topics;
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      introduction: { type: "string", required: false }
    });

    const topics = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = topics;
  }
}

module.exports = new TopicsCtl();
