const Router = require("koa-router");
const router = new Router({ prefix: "/users" }); //前缀路由
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login
} = require("../controllers/users");
router.get("/", find);

router.post("/", create);
router.post("/login", login);

router.get("/:id", findById);
router.patch("/:id", update);
router.delete("/:id", del);

module.exports = router;
