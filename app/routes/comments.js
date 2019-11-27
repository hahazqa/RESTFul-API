// const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers/:answerId/comments" }); //前缀路由
const {
  find,
  findById,
  create,
  update,
  checkCommentExist,
  checkCommentator,
  delete:del
} = require("../controllers/comments");

const { secret } = require("../config");
const auth = jwt({ secret });
//自己编写的简单认证
// const auth = async (ctx, next) => {
//   const { authorization = "" } = ctx.request.header;
//   const token = authorization.replace("Bearer ", "");
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     ctx.state.user = user;
//   } catch (error) {
//     ctx.throw(401, error.message);
//   }
//   await next();
// };

router.get("/", find);
router.post("/", auth, create);   
router.get("/:id",checkCommentExist, findById);
router.patch("/:id", auth,checkCommentExist,checkCommentator, update);
router.delete("/:id", auth,checkCommentExist,checkCommentator, del);
module.exports = router;
