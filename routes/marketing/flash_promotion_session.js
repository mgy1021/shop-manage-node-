/*
 * @Description: 限时购场次表
 * @Author: Mogy
 * @Date: 2022-02-22 14:25:47
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 14:35:03
 */

var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// id查询
router.get('/flash_promotion_session/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "sms_flash_promotion_session", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 分页查询
router.get('/flash_promotion_session/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const title = req.query.title
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (title != null && title !== "") {
            sql += ` and title LIKE '%${title}%'`
        }
        //数据库操作
        let results = await handleDB(res, "sms_flash_promotion_session", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "sms_flash_promotion_session", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// 删除
router.delete('/flash_promotion_session/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "sms_flash_promotion_session", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/flash_promotion_session/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "sms_flash_promotion_session", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增秒杀活动成功！", data: results })
        } else {
            let results = await handleDB(res, "sms_flash_promotion_session", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新秒杀活动成功！", data: results })
        }
    })()
});

module.exports = router
