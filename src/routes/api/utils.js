/**
 * @description utils api 路由
 * @author ZombieBrand
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
router.prefix('/api/utils')


/**
 * @deprecated 上传功能
 */
router.post('/upload', loginCheck, koaForm(), async (ctx) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})
module.exports = router