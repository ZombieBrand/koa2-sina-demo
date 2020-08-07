/*
 * @Author: ZombieBrand
 * @Date: 2020-08-05 17:14:28
 * @LastEditTime: 2020-08-05 17:26:08
 * @LastEditors: Please set LastEditors
 * @Description: 连接redis的方法get set
 * @FilePath: \koa2-sina-demo\src\cache\_redis.js
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)