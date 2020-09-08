/**
 * @description 个人主页 controller
 * @author ZombieBrand
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取个人主页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页面  
 */
async function getProfileBlogList({ userName, pageIndex = 0 }) {
    const result = await getBlogListByUser({
        pageSize: PAGE_SIZE,
        userName,
        pageIndex
    })
    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}