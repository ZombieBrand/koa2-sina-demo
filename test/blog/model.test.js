/**
 * @description 微博数据模型单元测试
 * @author ZombieBrand
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性,符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: '微博内容',
        image: '/xxx.png'
    })
    // 验证各个属性
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('微博内容')
    expect(blog.image).toBe('/xxx.png')
})