/*
 * @Description: 新品推荐
 * @Author: Mogy
 * @Date: 2022-02-24 12:01:22
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 17:47:32
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// id查询
router.get('/home_new_product/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "sms_home_new_product", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 分页查询
router.get('/home_new_product/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const product_name = req.query.product_name
        const recommend_status = req.query.recommend_status
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (product_name != null && product_name !== "") {
            sql += ` and product_name LIKE '%${product_name}%'`
        }
        if (recommend_status != null && recommend_status !== "") {
            sql += ` and recommend_status=${recommend_status}`
        }
        //数据库操作
        let results = await handleDB(res, "sms_home_new_product", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "sms_home_new_product", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// 删除
router.delete('/home_new_product/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "sms_home_new_product", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/home_new_product/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "sms_home_new_product", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增新品推荐成功！", data: results })
        } else {
            let results = await handleDB(res, "sms_home_new_product", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新新品推荐成功！", data: results })
        }
    })()
});

module.exports = router
