/**
 * @description 存储配置
 * @author ZombieBrand
 */
const { isProd } = require("../utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};
let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "cyz121",
  port: "3306",
  database: "koa2_weibo_db",
};
// 线上的redis配置
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
// 线上的MYSQL配置
if (isProd) {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "cyz121",
    port: "3306",
    database: "koa2_weibo_db",
  };
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
