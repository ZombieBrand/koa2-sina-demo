/**
 * @description user view 路由
 * @author ZombieBrand
 */
const router = require("koa-router")();
const { loginRedirect } = require('../../middlewares/loginChecks')
/**
 * 获取用户信息
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false //默认未登录
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get("/login", async (ctx) => {
  await ctx.render("login", getLoginInfo(ctx));
});

router.get("/register", async (ctx) => {
  await ctx.render("register", getLoginInfo(ctx));
});

router.get("/setting", loginRedirect, async (ctx) => {
  await ctx.render("setting", ctx.session.userInfo)
})
module.exports = router;
