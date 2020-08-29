/**
 * @description user model test
 * @author ZombieBrand
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性,符合预期', () => {
    const user = User.build({
        userName: "zhangsan",
        password: "p123123",
        nickName: "张三",
        gender: 1,
        picture: "/xxx.png",
        city: "北京",
    })
    // 验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(1)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})