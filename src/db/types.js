/**
 * @description 封装 sequelize 数据类型
 * @author 双月老师
 */
const { DataTypes } = require("sequelize");

module.exports = {
  STRING: DataTypes.STRING,
  DECIMAL: DataTypes.DECIMAL,
  TEXT: DataTypes.TEXT,
  INTEGER: DataTypes.INTEGER,
  BOOLEAN: DataTypes.BOOLEAN,
};
