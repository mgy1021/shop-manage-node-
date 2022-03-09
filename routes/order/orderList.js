/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 09:23:07
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-10 14:15:04
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 分页查询
router.get('/orderList/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const receiver_name = req.query.receiver_name
        const status = req.query.status
        const order_sn = req.query.order_sn
        const order_type = req.query.order_type
        const source_type = req.query.source_type
        const create_time = req.query.create_time
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (receiver_name != null && receiver_name !== "") {
            sql += ` and receiver_name like '%${receiver_name}%'`
        }
        if (status != null && status !== "") {
            sql += ` and status='${status}'`
        }
        if (order_sn != null && order_sn !== "") {
            sql += ` and order_sn='${order_sn}'`
        }
        if (order_type != null && order_type !== "") {
            sql += ` and order_type=${order_type}`
        }
        if (source_type != null && source_type !== "") {
            sql += ` and source_type=${source_type}`
        }
        if (create_time != null && create_time !== "") {
            sql += ` and create_time like '%${create_time}%'`
        }
        //数据库操作
        let results = await handleDB(res, "oms_order", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "oms_order", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// 删除
router.delete('/orderList/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// id查询
router.get('/orderList/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 新增或修改
router.post('/orderList/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "oms_order", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增商品订单成功！", data: results })
        } else {
            let results = await handleDB(res, "oms_order", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新商品订单成功！", data: results })
        }
    })()
});

module.exports = router