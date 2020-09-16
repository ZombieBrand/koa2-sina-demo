/**
 * @description 用户关系 controller
 * @author ZombieBrand
 */
const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 根据userId 获取粉丝列表
 * @param {number} userId 
 */
async function getFans(userId) {
    //service
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList: userList
    })
}

module.exports = {
    getFans
}