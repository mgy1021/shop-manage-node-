/*
 * @Description: 退货申请接口
 * @Author: Mogy
 * @Date: 2022-02-10 22:40:39
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-12 23:18:05
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// id查询
router.get('/orderSetting/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_setting", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 删除
router.delete('/orderSetting/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_setting", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/orderSetting/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "oms_order_setting", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增超时操作成功！", data: results })
        } else {
            let results = await handleDB(res, "oms_order_setting", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新超时操作成功！", data: results })
        }
    })()
});

module.exports = router