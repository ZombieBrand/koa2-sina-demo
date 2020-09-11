/**
 * @description 个人主页api路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
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
    console.log(result,'result')
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    console.log(result,'result')
    ctx.body = result
})
module.exports = router