/**
 * @description 失败信息集合,包括errno 和 message
 * @author ZombieBrand
 */

module.exports = {
    registerUserNameExistInfo: {
        errno: 10001,
        message: '用户名已存在'
    },
    registerFailInfo: {
        errno: 10002,
        message: '注册失败,请重试'
    },
    registerUserNameNotExistInfo: {
        errno: 10003,
        message: '用户名未存在'
    }
}