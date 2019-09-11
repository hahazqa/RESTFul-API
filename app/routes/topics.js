// const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/topics" }); //前缀路由
const {
  find,
  findById,
  create,
  update,
} = require("../controllers/topics");

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
router.get("/:id", findById);
router.patch("/:id", auth, update);

module.exports = router;
