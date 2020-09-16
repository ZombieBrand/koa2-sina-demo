/**
 * @description 用户关系 services
 * @author ZombieBrand
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取关注该用户的用户列表,即该用户的粉丝
 * @param {number} followerId 被关注人的id 
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'username', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: UserRelation,
            where: {
                followerId
            }
        }]
    })
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

module.exports = {
    getUsersByFollower
}