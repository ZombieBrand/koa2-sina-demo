/**
 * @description 初始化sequelize实例
 * @author ZombieBrand
 */
const { isProd, isTest } = require("../utils/env");
const { MYSQL_CONF } = require("../config/db");
const Sequelize = require("sequelize");
const config = {
  host: MYSQL_CONF.host,
  dialect: "mysql",
};
// test 环境不打印sql语句
if (isTest) {
  config.logging = () => {};
}
// 线上环境,使用连接池
if (isProd) {
  config.pool = {
    max: 5, //连接池中最大的连接数量
    min: 0, //最小
    idle: 10000, //如果一个连接池10s之内没有被使用则释放
  };
}
const seq = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  config
);
module.exports = seq;
