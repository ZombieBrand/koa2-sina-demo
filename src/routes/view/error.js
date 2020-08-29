/**
 * @description error 404 路由
 * @author ZombieBrand
 */

const router = require("koa-router")();

//error
router.get("/error", async (ctx) => {
  await ctx.render("error");
});

//404
router.get("*", async (ctx) => {
  await ctx.render("404");
});

module.exports = router;
