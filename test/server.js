/**
 *  @description jest server
 *  @author ZombieBrand
 */

const request = require('supertest')
// 运行app.js服务这样才能测试这个服务
const server = require('../src/app').callback()

module.exports = request(server)