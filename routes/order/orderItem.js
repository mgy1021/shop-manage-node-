/*
 * @Description: 订单商品信息表:订单中包含的商品信息，一个订单中会有多个订单商品信息。
 * @Author: Mogy
 * @Date: 2022-02-08 09:23:07
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-09 15:11:22
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 查询所有
router.get('/orderItem/findAllOrderItem', function (req, res, next) {
    (async function () {
        if (!req.query.order_id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let order_id = req.query.order_id
            let results = await handleDB(res, "oms_order_item", "find", "数据库查找数据出错！", `order_id=${order_id}`);
            res.send({ code: 200, data: results, message: "操作成功！", total: results.length });
        }
    })()
});

// 删除
router.delete('/orderItem/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_item", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// id查询
router.get('/orderItem/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_item", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

module.exports = router