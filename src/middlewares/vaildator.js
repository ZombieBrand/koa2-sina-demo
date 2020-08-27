/**
 * @description json schema 验证中间件
 * @author ZombieBrand
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 生成 json schema 验证的中间件
 * @param {Function} validateFn 验证函数 
 */
function genValidator(validateFn) {
    //定义中间件函数
    async function vaildator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
        } else {
            //验证成功
            await next()
        }
    }
    // 返回中间件函数+
    return vaildator
}
module.exports = {
    genValidator
}