// const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/users" }); //前缀路由
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  listFollowing,
  listFollowers,
  checkUserExist,
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  listFollowingTopics,
  listQuestions,
  listLikingAnswes, LikingAnswer, unLikingAnswer,
  listDisLikingAnswes, disLikingAnswer, undisLikingAnswer,
  listCollectingAnswes, collectAnswer, uncollectAnswer
} = require("../controllers/users");

const {
  checkTopicExist
} = require("../controllers/topics")
const {
  checkAnswerExist
} = require("../controllers/answers")

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

router.post("/", create);
router.post("/login", login);
router.get("/:id/following", listFollowing);
router.get("/:id/followTopics", listFollowingTopics);
router.get("/:id/followers", listFollowers);
router.get("/:id/questions", listQuestions);
router.put("/following/:id", auth,checkUserExist, follow);
router.put("/followTopics/:id", auth, checkTopicExist, followTopic);
   
router.get("/:id", findById);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);
router.delete("/following/:id", auth,checkUserExist, unfollow);
router.delete("/followTopics/:id", auth,checkTopicExist, unfollowTopic);

router.get("/:id/likingAnswers", listLikingAnswes);
router.put("/likingAnswers/:id", auth, checkAnswerExist, LikingAnswer, undisLikingAnswer);
router.delete("/likingAnswers/:id", auth,checkAnswerExist, unLikingAnswer);

router.get("/:id/dislikingAnswers", listDisLikingAnswes);
router.put("/dislikingAnswers/:id", auth, checkAnswerExist, disLikingAnswer,unLikingAnswer);
router.delete("/dislikingAnswers/:id", auth,checkAnswerExist, undisLikingAnswer);

router.get("/:id/collectingAnswers", listCollectingAnswes);
router.put("/collectingAnswers/:id", auth, checkAnswerExist, collectAnswer);
router.delete("/collectingAnswers/:id", auth,checkAnswerExist, uncollectAnswer);
module.exports = router;
