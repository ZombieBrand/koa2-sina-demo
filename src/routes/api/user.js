/**
 * @description user api 路由
 * @author ZombieBrand
 */

const router = require("koa-router")();
const { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../vaildator/user')
const { genValidator } = require('../../middlewares/vaildator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
// const user
router.prefix("/api/user");
/**
 * @api {post} /api/user/register 注册接口
 * @apiGroup User
 * @apiName register
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
 *  "data":"{}"
 * }
 * 
 */
router.post("/register", genValidator(userValidate), async (ctx) => {
    const { userName, password, gender } = ctx.request.body
    //调用 controller
    ctx.body = await register({
        userName,
        password,
        gender
    })
});

/**
 * @api {post} /api/user/login 登录接口
 * @apiGroup User
 * @apiName login
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
 *  "data":"{}"
 * }
 * 
 */
router.post("/login", genValidator(userValidate), async (ctx) => {
    const { userName, password } = ctx.request.body
    //调用 controller
    ctx.body = await login({
        ctx,
        userName,
        password
    })
});



/**
 * @api {post} /api/user/isExist 查询用户是否存在
 * @apiGroup User
 * @apiName isExist
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
 *  "message":"用户名未存在"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * "errno": 0,
 * "data": {
 *  "id": 3,
 *  "userName": "lisi",
 *  "nickName": "李四",
 *  "picture": "/1599116588584_b2b3111fb53656b173f33d0f5b5e6206.jpeg",
 *  "city": "北京"
 * }
 */
router.post("/isExist", async (ctx) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName)
});


/**
 * @api {patch} /api/user/changeInfo 修改个人信息
 * @apiGroup User
 * @apiName changeInfo
 * @apiDescription 修改个人信息
 * @apiParam {String} nickName 用户名
 * @apiParam {String} city 城市
 * @apiParam {String} picture 头像
 * @apiParamExample {json} Request-Example
 * {
 *  "nickName":"zhangsan"
 *  "city":"北京"
 *  "picture":"头像url地址1"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10008"
 *  "message":"修改基本信息失败"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":{}
 * }
 */

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})



/**
 * @api {patch} /api/user/changePassword 修改账户密码
 * @apiGroup User
 * @apiName changePassword
 * @apiDescription 修改账户密码
 * @apiParam {String} password 旧密码
 * @apiParam {String} newPassword 新密码
 * @apiParamExample {json} Request-Example
 * {
 *  "password":"123122a"
 *  "newPassword":"123122b"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10006"
 *  "message":"修改密码失败"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":{}
 * }
 */

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    // controller
    ctx.body = await changePassword({ userName, password, newPassword })

})


/**
 * @api {post} /api/user/logout 退出登录
 * @apiGroup User
 * @apiName logout
 * @apiDescription 退出登录
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":{}
 * }
 */

router.post('/logout', loginCheck, async (ctx) => {
    ctx.body = await logout(ctx)
})

/**
 * @apiDescription jest测试删除用户
 */
router.post("/delete", loginCheck, async (ctx) => {
    if (isTest) {
        // 测试环境可以删除当前登录账号
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
});
module.exports = router;

