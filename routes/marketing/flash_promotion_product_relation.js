/*
 * @Description: 限时购场次表
 * @Author: Mogy
 * @Date: 2022-02-22 14:25:47
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 09:24:54
 */

var express = require('express');
var router = express.Router();
const handleDB = require("../../db/handleDB");

// 限时购id查询活动时间段内的所有商品
router.get('/flash_promotion_product_relation/queryActiviryProductById', function (req, res, next) {
    (async function () {
        if (!req.query.flash_promotion_id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let flash_promotion_id = req.query.flash_promotion_id
            let results = await handleDB(res, "sms_flash_promotion_product_relation", "find", "数据库查找数据出错！", `flash_promotion_id=${flash_promotion_id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

// 分页查询
router.get('/flash_promotion_product_relation/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const flash_promotion_session_id = req.query.flash_promotion_session_id
        if (!pageSize || !pageNum || !flash_promotion_session_id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (flash_promotion_session_id != null && flash_promotion_session_id !== "") {
            sql += ` and flash_promotion_session_id=${flash_promotion_session_id}`
        }
        //数据库操作
        let results = await handleDB(res, "sms_flash_promotion_product_relation", "find", "数据库分页查询数据出错！", sql);
        const ids = results.map((item) => {
            return item.product_id
        })
        let idsSql = `id IN(${ids.toString()})`
        let productsData = await handleDB(res, "pms_product", "limit", "数据库分页查询数据出错！", { where: idsSql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "pms_product", "find", "数据库分页查询数据出错！", idsSql);
        let activityData = productsData.map((item, index) => {
            return { name: item.name, product_sn: item.product_sn, price: item.price, stock: item.stock, ...results[index] }
        })
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: activityData, total: total.length });
    })();
});

// 删除
router.delete('/flash_promotion_product_relation/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "sms_flash_promotion_product_relation", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

// 新增或修改
router.post('/flash_promotion_product_relation/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "sms_flash_promotion_product_relation", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增秒杀活动成功！", data: results })
        } else {
            let results = await handleDB(res, "sms_flash_promotion_product_relation", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新秒杀活动成功！", data: results })
        }
    })()
});

module.exports = router
