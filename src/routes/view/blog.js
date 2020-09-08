/**
 * @description 微博view路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
//首页
router.get('/', loginRedirect, async (ctx) => {
    await ctx.render('index', {})
})
//个人主页
router.get('/profile', loginRedirect, async (ctx) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx) => {
    const { userName: curUserName } = ctx.params

    const result = await getProfileBlogList({ userName: curUserName, pageIndex: 0 })

    const { isEmpty, blogList, pageSize, pageIndex, count } = result
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
module.exports = router