/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-01-27 14:22:05
 */
var express = require('express');
var handleDB = require('../db/handleDB');
var router = express.Router();
// const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../data/student")
/* GET home page. */

router.get('/', function (req, res, next) {
    (async function () {
        let user_id = 1;
        let result
        if (user_id) {
            result = await handleDB(res, "ums_member", "find", "数据库查询出错", `id=${user_id}`)
            console.log(result);
            res.send(result)
        }
    })()

});

module.exports = router;
