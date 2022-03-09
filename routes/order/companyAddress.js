/*
 * @Description: 订单商品信息表:订单中包含的商品信息，一个订单中会有多个订单商品信息。
 * @Author: Mogy
 * @Date: 2022-02-08 09:23:07
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-11 22:20:19
 */
var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 查询所有
router.get('/companyAddress/findAllCompanyAddress', function (req, res, next) {
    (async function () {
        let results = await handleDB(res, "oms_company_address", "find", "数据库查找数据出错！");
        res.send({ code: 200, data: results, message: "操作成功！", total: results.length });
    })()
});

// 删除
router.delete('/companyAddress/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_company_address", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// id查询
router.get('/companyAddress/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "oms_company_address", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

module.exports = router