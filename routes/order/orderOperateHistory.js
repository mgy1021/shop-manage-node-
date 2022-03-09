/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-09 17:20:54
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-10 18:00:24
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 查询所有
router.get('/orderOperateHistory/findAllOrderOperateHistory', function (req, res, next) {
    (async function () {
        if (!req.query.order_id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let order_id = req.query.order_id
            let results = await handleDB(res, "oms_order_operate_history", "find", "数据库查找数据出错！", `order_id=${order_id}`);
            res.send({ code: 200, data: results, message: "操作成功！", total: results.length });
        }
    })()
});

// 新增或修改
router.post('/orderOperateHistory/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "oms_order_operate_history", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增操作订单状态操作成功！", data: results })
        } else {
            let results = await handleDB(res, "oms_order_operate_history", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新操作订单状态操作成功！", data: results })
        }
    })()
});

module.exports = router