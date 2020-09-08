/**
 * @description 微博service
 * @author ZombieBrand
 */

const { Blog, User } = require('../db/model/index')
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

module.exports = {
    createBlog,
    getBlogListByUser
}