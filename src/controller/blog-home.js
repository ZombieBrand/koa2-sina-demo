/**
 * @description 首页 controller
 * @author ZombieBrand
 */
const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constant')
/**
 * 创建微博
 * @param {Number} userId  
 * @param {String} content  
 * @param {String} image  
 */
async function create({ userId, content, image }) {
    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })

    const { count, blogList } = result

    //返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        pageSize: PAGE_SIZE,
        count
    })
}
module.exports = {
    create,
    getHomeBlogList
}