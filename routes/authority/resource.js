/*
 * @Description: 资源管理
 * @Author: Mogy
 * @Date: 2022-02-10 22:40:39
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-15 10:21:48
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// id查询
router.get('/resource/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "ums_resource", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 分页查询
router.get('/resource/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const name = req.query.name
        const url = req.query.url
        const category_id = req.query.category_id
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (name != null && name !== "") {
            sql += ` and name LIKE '%${name}%'`
        }
        if (url != null && url !== "") {
            sql += ` and url LIKE '%${url}%'`
        }
        if (category_id != null && category_id !== "") {
            sql += ` and category_id=${category_id}`
        }
        //数据库操作
        let results = await handleDB(res, "ums_resource", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "ums_resource", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// 删除
router.delete('/resource/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "ums_resource", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/resource/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "ums_resource", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增资源成功！", data: results })
        } else {
            let results = await handleDB(res, "ums_resource", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新资源成功！", data: results })
        }
    })()
});

module.exports = router