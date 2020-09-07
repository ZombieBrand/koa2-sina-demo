/**
 * @description 微博数据格式校验
 * @author ZombieBrand
 */

const validate = require('./_vaildate')
const SCHEMA = {
    type: 'object',
    properties: {
        content:{
            type:'string'
        },
        image:{
            type:'string',
            maxLength:255
        }
    }
}

/**
 * 校验微博数据格式
 * @param {Object} data 
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate