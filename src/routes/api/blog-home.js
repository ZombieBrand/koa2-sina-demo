/**
 * @description 首页 api 路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { createBlog, create } = require('../../controller/blog-home')
router.prefix('/api/blog')

/**
 * @api {post} /api/blog/create 创建微博
 * @apiGroup blog
 * @apiName create
 * @apiDescription 创建微博
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
router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})
module.exports = router