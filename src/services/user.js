/**
 * @description user service
 * @author ZombieBrand
 */

const { User } = require("../db/model/index")
const { formatUser } = require("./_format")
/**
 * 获取用户信息
 * @param {String} userName 用户名 
 * @param {String} password 密码
 */
async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result === null) {
        // 未找到
        return result
    }
    // 格式化处理
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * 创建用户
 * @param {String} userName 
 * @param {String} password 
 * @param {Number} gender 性别
 * @param {String} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}
module.exports = {
    getUserInfo,
    createUser
}