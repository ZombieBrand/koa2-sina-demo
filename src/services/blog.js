/**
 * @description 微博service
 * @author ZombieBrand
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
    createBlog
}