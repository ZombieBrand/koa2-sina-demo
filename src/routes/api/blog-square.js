/**
 * @description 广场 api 路由
 * @author ZombieBrand
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')


/**
 * @api {get} /api/square/loadMore/:pageIndex 获取广场的微博列表
 * @apiGroup blog
 * @apiName loadMore
 * @apiDescription 获取广场的微博列表
 * @apiParam {Number} pageIndex 当前页
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/api/square/loadMore/0
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
router.get('/loadMore/:pageIndex', loginCheck, async (ctx) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)
    //渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})


module.exports = router