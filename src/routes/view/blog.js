/**
 * @description 微博view路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')
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
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        //是当前登录用户
        curUserInfo = myUserInfo
    } else {
        //不是当前登录用户
        const exisResult = await isExist(curUserName)
        if (exisResult.errno !== 0) {
            //用户不存在
            return
        }
        //用户名存在
        curUserInfo = exisResult.data
    }
    // 获取微博第一页数据
    const result = await getProfileBlogList({ userName: curUserName, pageIndex: 0 })
    const { isEmpty, blogList, pageSize, pageIndex, count } = result

    //获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 我是否关注了此人?
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            isMe,
            amIFollowed
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx) => {
    // 获取微博数据 第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result
    await ctx.render('square', {
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