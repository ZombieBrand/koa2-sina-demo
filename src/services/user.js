/**
 * @description user service
 * @author ZombieBrand
 */

const { User } = require("../db/model/index")
const { formatUser } = require("./_format")
const { addFollower } = require("./user-relation")
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
    const data = result.dataValues

    //自己关注自己(为了方便首页获取数据)
    addFollower(data.id, data.id)
    return data
}

/**
 * 更新个人信息
 * @param {Object} param0 要修改的内容 {newPassword,newNickName,newPicture,newCity}
 * @param {Object} param1 查询条件 {userName,password}
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }
    //拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改行数大于零成功
}

/**
 * 数据库删除用户
 * @param {String} userName 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}
module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}