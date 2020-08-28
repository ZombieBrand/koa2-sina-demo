/**
 * @description user api 路由
 * @author ZombieBrand
 */

const router = require("koa-router")();
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidate = require('../../vaildator/user')
const { genValidator } = require('../../middlewares/vaildator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
// const user
router.prefix("/api/user");
/**
 * @api {post} /api/user/register 注册接口
 * @apiGroup User
 * @apiDescription 注册接口
 * @apiParam {String} userName 用户名
 * @apiParam {String} password 密码
 * @apiParam {Number} gender 性别(1.男,2女,3保密)
 * @apiParamExample {json} Request-Example
 * {
 *  "userName":"test",
 *  "password":"test123",
 *  "gender":"3"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10002"
 *  "message":"注册失败,请重试"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":""
 * }
 * 
 */
router.post("/register", genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    //调用 controller
    ctx.body = await register({
        userName,
        password,
        gender
    })
    await next()
});

/**
 * @api {post} /api/user/login 登录接口
 * @apiGroup User
 * @apiDescription 登录接口
 * @apiParam {String} userName 用户名
 * @apiParam {String} password 密码
 * @apiParamExample {json} Request-Example
 * {
 *  "userName":"test",
 *  "password":"test123",
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10004"
 *  "message":"登录失败,用户名活密码错误"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":""
 * }
 * 
 */
router.post("/login", genValidator(userValidate), async (ctx, next) => {
    const { userName, password } = ctx.request.body
    //调用 controller
    ctx.body = await login({
        ctx,
        userName,
        password
    })
    await next()
});



/**
 * @api {post} /api/user/isExist 查询用户是否存在
 * @apiGroup User
 * @apiDescription 通用查验用户是否存在
 * @apiParam {String} userName 用户名
 * @apiParamExample {json} Request-Example
 * {
 *  "userName":"test"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10003"
 *  "message":"用户名已存在"
 * }
 * 
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "10003"
 *  "message":"用户名已存在"
 * }
 */
router.post("/isExist", async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName)
    await next()
});



/**
 * @apiDescription jest测试删除用户
 */


router.post("/delete", loginCheck, async (ctx, next) => {
    if (isTest) {
        // 测试环境可以删除当前登录账号
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
    await next()
});
module.exports = router;
