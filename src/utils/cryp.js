/**
 * @description 加密方法
 * @author ZombieBrand
 */

 //引入node内置加密模块
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * md5 加密
 * @param {String} content 明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {String} password 明文
 */
function doCrypto(password){
    const str=`password=${password}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto