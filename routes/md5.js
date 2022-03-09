/*
 * @Description: 测试md5
 * @Author: Mogy
 * @Date: 2022-02-18 17:14:11
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-18 17:43:25
 */

const md = require("md5")
var express = require('express');
var router = express.Router();

router.get("/test_md5", (req, res) => {
    let ret = md("message")
    res.send(ret)
})

module.exports = router;

