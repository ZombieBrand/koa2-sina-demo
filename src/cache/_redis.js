/*
 * @Author: ZombieBrand
 * @Description: 连接redis的方法get set
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log('redis error', err)
})
/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 单位秒
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    // 过期时间
    redisClient.expire(key, timeout)
}
/**
 * redis get
 * @param {string} key 键 
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (err) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}