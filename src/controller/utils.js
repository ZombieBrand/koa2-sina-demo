
/**
 * @description utils controller
 * @author ZombieBrand
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

const MIX_SIZE = 1024 * 1024 * 1024
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

//判断是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {String} name 文件名 
 * @param {String} type 文件类型
 * @param {Number} size 文件大小
 * @param {String} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
    if (size > MIX_SIZE) {
        //注意此时已经上传到服务器需要删除避免磁盘空间浪费
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    } else {
        // 移动文件
        const fileName = `${Date.now()}_${name}`
        const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
        await fse.move(filePath, distFilePath)
        return new SuccessModel({
            url: `/${fileName}`,
            fileType:type
        })
    }
}
module.exports = {
    saveFile
}