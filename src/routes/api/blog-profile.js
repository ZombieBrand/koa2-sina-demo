/**
 * @description 个人主页api路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')
router.prefix('/api/profile')

/**
 * @api {get} /api/profile/loadMore/:userName/:pageIndex 加载更多
 * @apiGroup blog
 * @apiName loadMore
 * @apiDescription 加载更多
 * @apiParam {String} userName 用户名
 * @apiParam {Number} pageIndex 当前页
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/api/profile/loadMore/test/1
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
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList({ userName, pageIndex })
    // 渲染成页面
    console.log(result, 'result')
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    console.log(result, 'result')
    ctx.body = result
})

/**
 * @api {post} /api/profile/follow 关注
 * @apiGroup blog
 * @apiName follow
 * @apiDescription 关注接口
 * @apiParam {number} userId 用户名
 * @apiParamExample {json} Request-Example
 * {
 *  "userId":"test"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10011"
 *  "message":"添加关注失败"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":"{}"
 * }
 * 
 */
router.post('/follow', loginCheck, async (ctx) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await follow(myUserId, curUserId)
})

/**
 * @api {post} /api/profile/unFollow 关注
 * @apiGroup blog
 * @apiName unFollow
 * @apiDescription 取消关注接口
 * @apiParam {number} userId 用户名
 * @apiParamExample {json} Request-Example
 * {
 *  "userId":"test"
 * }
 * 
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *  "errno": "10012"
 *  "message":"取消关注失败"
 * }
 * 
 * @apiSuccessExample {json} success-example
 * {
 *  "errno": "0"
 *  "data":"{}"
 * }
 * 
 */
router.post('/unFollow', loginCheck, async (ctx) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unFollow(myUserId, curUserId)
})
module.exports = router