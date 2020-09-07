/**
 * @description 首页 test
 * @author ZombieBrand
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')
let BLOG_ID = ''
test('创建一条微博,应该成功', async () => {
    const content = '但愿测试自动创建的微博' + Date.now()
    const image = '/xxx.png'

    const res = await server.post('/api/blog/create').send({ content, image }).set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    BLOG_ID = res.body.data.id
})