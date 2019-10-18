const Question = require("../models/questions");
class QuestionsCtl {
  async find(ctx) {
    //分页功能
    const { per_page = 10 } = ctx.query;
    const page = Math.max(parseInt(ctx.query.page), 1) - 1;
    const perPage = Math.max(parseInt(per_page), 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Question.find({ $or:[{title:q},{description:q}] })  //模糊搜索
      .limit(perPage)
      .skip(page * perPage);
  }
  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select('+questioner');
    if (!question) {
      ctx.throw(404, "问题不存在");
    }
    ctx.state.question = question;
    await next();
  }
  async findById(ctx) {
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter(f => f)
      .map(f => " +" + f)
      .join("");
    const questions = await Question.findById(ctx.params.id).select(selectFields).populate('questioner');
    ctx.body = questions;
  }
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: {type: "string", required: false}
    });
    const questions = await new Question({...ctx.request.body, questioner: ctx.state.user._id }).save();
    ctx.body = questions;
  }
  async checkQuestioner (ctx, next) {
    const { question } = ctx.state;
    if( question.questioner.toString() !== ctx.state.user._id ) {
      ctx.throw(403,'没有权限');
    } 
    await next();
  }
  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: {type: "string", required: false},
    });

    await ctx.state.question.update(
      ctx.request.body
    );
    ctx.body = ctx.state.question;
  }
  async delete(ctx) {
    await Question.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new QuestionsCtl();