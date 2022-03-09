/*
 * @Description: 图片上传
 * @Author: Mogy
 * @Date: 2022-02-25 16:46:36
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-25 17:23:24
 */
var express = require('express');
var router = express.Router();
let qiniu = require('qiniu'); // 需要加载qiniu模块的

let config = {
    "AK": "VTmv3SInp1O4S1OLCIeU-BRXpEUuwp9Dk-IReIvy",
    "SK": "e0cum7ASQ8Wp22weH1dDmjrR8GyaGo2QqRhJVFaX",
    "Bucket": "mogy-picture"
}

router.post('/imgToken', async (req, res, next) => {
    let mac = new qiniu.auth.digest.Mac(config.AK, config.SK);
    let options = {
        scope: config.Bucket,
        expires: 3600 * 24
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);
    if (uploadToken) {
        res.send({
            code: 200,
            data: { uploadToken },
            message: "获取图片上传token成功!"
        })
    } else {
        res.send({
            code: 500,
            data: { uploadToken },
            message: "获取图片上传token失败!"
        })
    }

})

module.exports = router
