/**
 * @description 用户关系 单元测试
 * @author ZombieBrand
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const { ID, USER_NAME, COOKIE } = require('../testUserInfo')
const zhangsan = {
    ID: 1,
    USER_NAME: 'zhangsan',
    COOKIE: 'weibo.sid=awqSe3QSr0XOlU1vTN4obrW_mYO3K-4h; weibo.sid.sig=GFOu3tL_DHBjdNFEU_AqWlVe158'
}

// 先让张三取消关注李四(为了避免现在张三关了李四)
test('无论如何,先取消关注', async () => {
    const res = await server.post('/api/profile/unFollow').send({ userId: ID }).set('cookie', zhangsan.COOKIE)
    expect(1).toBe(1)
})

//添加关注
test('张三关注李四,应该成功', async () => {
    const res = await server.post('/api/profile/follow').send({ userId: ID }).set('cookie', zhangsan.COOKIE)
    expect(res.body.errno).toBe(0)
})

//获取粉丝
test('获取李四的粉丝,应该有张三', async () => {
    const result = await getFans(ID)
    const { count, fansList } = result.data
    const hasUserName = fansList.some(fanInfo => {
        return fanInfo.userName = zhangsan.USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取张三的关注人,应该有李四', async () => {
    const result = await getFollowers(zhangsan.ID)
    console.log(result)
    const { count, followersList } = result.data
    const hasUserName = followersList.some(followersInfo => {
        return followersInfo.userName === USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 取消关注
test('张三取消关注李四,应该成功', async () => {
    const res = await server.post('/api/profile/unFollow').send({ userId: ID }).set('cookie', zhangsan.COOKIE)
    expect(res.body.errno).toBe(0)
})