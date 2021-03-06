/**
 * @description user controller
 * @author ZombieBrand
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo, changeInfoFailInfo, changePasswordFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {String} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户名已存在
        return new SuccessModel(userInfo)
    } else {
        //用户不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx 
 * @param {String} userName 
 * @param {String} password 
 */
async function login({ ctx, userName, password }) {
    //获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        //登录失败
        return new ErrorModel(loginFailInfo)
    }
    //登录成功
    ctx.session.userInfo = userInfo
    return new SuccessModel()
}

/**
 * 注册用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    //注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 *  修改用户信息
 * @param {Object} ctx 
 * @param {String} nickName 昵称
 * @param {String} city 城市
 * @param {String} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser({ newNickName: nickName, newCity: city, newPicture: picture }, { userName })
    if (result) {
        // 修改成功后修改session
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 *  修改用户密码
 * @param {String} userName 
 * @param {String} password 
 * @param {String} newPassword 
 */
async function changePassword({ userName, password, newPassword }) {
    const result = await updateUser({ newPassword: doCrypto(newPassword) }, { userName, password: doCrypto(password) })
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 登出
 * @param {String} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {String} userName 
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}
module.exports = { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout }