/**
 * @description json test
 * @author ZombieBrand
 */

 const server = require('./server')

 test('json 接口返回数据格式正确',async ()=>{
     const res= await server.get('/json')
     // 断言对象是否相等
     expect(res.body).toEqual({
        title: "koa2 json"
     })
     // 断言值是否相等
     expect(res.body.title).toBe('koa2 json')
 })