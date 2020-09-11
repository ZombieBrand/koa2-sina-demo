/**
 * @description 微博缓存层
 * @author ZombieBrand
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

//redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    //尝试获取缓存
    const chacheResult = await get(key)
    if (chacheResult !== null) {
        return chacheResult
    }

    //没有缓存,则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })

    //设置缓存,过期时间
    set(key, result, 60)
    
    return result
}

module.exports = {
    getSquareCacheList
}
