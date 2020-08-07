/*
 * @Author: ZombieBrand
 * @Date: 2020-08-05 15:52:35
 * @LastEditTime: 2020-08-05 16:00:51
 * @Description: 初始化sequelize实例
 * @FilePath: \koa2-sina-demo\src\db\seq.js
 */

const Sequelize = require('sequelize')
const config = {
    host:'localhost',
    dialect:'mysql'
}
const seq = new Sequelize('koa2_weibo_db','root','cyz121',config)
module.exports = seq