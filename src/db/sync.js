/**
 * @description sequelize 同步数据库
 * @author ZombieBrand
 */

const seq = require("./seq");
require("./model/index.js");
//测试连接
seq
  .authenticate()
  .then(() => {
    console.log("auth ok");
  })
  .catch(() => {
    console.log("auth err");
  });

//执行同步
seq.sync({ force: true }).then(() => {
  console.log("sync ok");
  seq.close();
});
