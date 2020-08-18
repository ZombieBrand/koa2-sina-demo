/**
 * @description user view 路由
 * @author ZombieBrand
 */
const router = require("koa-router")();

router.get("/login", async (ctx, next) => {
  await ctx.render("login", {});
  next();
});

router.get("/register", async (ctx, next) => {
  await ctx.render("register", {});
  next();
});
module.exports = router;
