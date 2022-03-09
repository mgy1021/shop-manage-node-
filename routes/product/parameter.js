/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 15:32:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 16:03:38
 */
/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 15:14:39
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/parameter.js")

router.get('/parameter/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

router.get('/parameter/deleteById', function (req, res, next) {
    deleteById(req.query.id, (result) => {
        if (result.affectedRows) {
            res.send(`删除成功${result.affectedRows}条数据！`)
        } else {
            res.send(`删除失败!`)
        }
    })
});

router.post('/parameter/saveOrUpdate', function (req, res, next) {
    console.log("res");
    saveOrUpdate(req.body, (result) => {
        res.send(result)
    })
});

router.get('/parameter/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

module.exports = router;
