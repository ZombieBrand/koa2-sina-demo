/**
 * @description 微博service
 * @author ZombieBrand
 */

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 创建微博
 * @param {Number} userId  
 * @param {String} content  
 * @param {String} image  
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 *  根据用户获取微博列表
 * @param {String} userName  
 * @param {Number} pageIndex  
 * @param {Number} pageSize  
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    const result = await Blog.findAndCountAll({
        limit: pageSize, //每页多少条
        offset: pageSize * pageIndex, //跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

/**
 * 获取关注者的微博列表(首页)
 * @param {Object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, //每页多少条
        offset: pageSize * pageIndex,//跳过多少条
        order: [['id', 'desc']],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatUser(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}