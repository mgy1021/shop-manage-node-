/*
 * @Description: 退货申请接口
 * @Author: Mogy
 * @Date: 2022-02-10 22:40:39
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-11 16:42:58
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 分页查询 
router.get('/returnOrders/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const id = req.query.id
        const status = req.query.status
        const create_time = req.query.create_time
        const handle_man = req.query.handle_man
        const handle_time = req.query.handle_time
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (id != null && id !== "") {
            sql += ` and id=${id}`
        }
        if (status != null && status !== "") {
            sql += ` and status=${status}`
        }
        if (create_time != null && create_time !== "") {
            sql += ` and create_time like '%${create_time}%'`
        }
        if (handle_man != null && handle_man !== "") {
            sql += ` and handle_man like '%${handle_man}%'`
        }
        if (handle_time != null && handle_time !== "") {
            sql += ` and handle_time like '%${handle_time}%'`
        }
        //数据库操作
        let results = await handleDB(res, "oms_order_return_apply", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "oms_order_return_apply", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// 删除
router.delete('/returnOrders/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_return_apply", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/returnOrders/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "oms_order_return_apply", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增退货申请成功！", data: results })
        } else {
            let results = await handleDB(res, "oms_order_return_apply", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新退货申请成功！", data: results })
        }
    })()
});

// id查询
router.get('/returnOrders/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_order_return_apply", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

module.exports = router