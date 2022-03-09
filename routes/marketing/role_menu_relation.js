/*
 * @Description:
 * @Author: Mogy
 * @Date: 2022-02-26 19:02:45
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 19:47:50
 */
// /*
//  * @Description: 菜单角色关系表
//  * @Author: Mogy
//  * @Date: 2022-02-24 12:01:22
//  * @LastEditors: Mogy
//  * @LastEditTime: 2022-02-26 19:45:55
//  */
// var express = require('express');
// var router = express.Router();
// const handleDB = require("../../db/handleDB");

// // id查询
// router.get('/role_menu_relation/queryOneById', function (req, res, next) {
//     (async function () {
//         if (!req.query.id) {
//             res.send({ code: 500, message: "参数错误！", data: [] });
//         } else {
//             let id = req.query.id
//             let results = await handleDB(res, "ums_role_menu_relation", "find", "数据库查找数据出错！", `id=${id}`);
//             res.send({ code: 200, data: results.pop(), message: "操作成功！" });
//         }
//     })()
// });

// // 分页查询
// router.get('/role_menu_relation/pageQuery', function (req, res, next) {
//     (async function () {
//         let sql = "1=1"
//         //获取参数， 判空
//         const pageSize = parseInt(req.query.pageSize)
//         const pageNum = parseInt(req.query.pageNum)
//         const name = req.query.name
//         const type = req.query.type
//         if (!pageSize || !pageNum) {
//             res.send({ code: 500, message: "参数错误！", data: [] });
//         }
//         if (name != null && name !== "") {
//             sql += ` and name LIKE '%${name}%'`
//         }
//         if (type != null && type !== "") {
//             sql += ` and type=${type}`
//         }
//         //数据库操作
//         let results = await handleDB(res, "ums_role_menu_relation", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
//         let total = await handleDB(res, "ums_role_menu_relation", "find", "数据库分页查询数据出错！", sql);
//         //查询到的结果返回页面中去
//         res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
//     })();
// });

// // 删除
// router.delete('/role_menu_relation/deleteById', function (req, res, next) {
//     (async function () {
//         if (!req.query.id) {
//             res.send({ code: 500, message: "参数错误！", data: [] });
//         } else {
//             let id = req.query.id
//             let results = await handleDB(res, "ums_role_menu_relation", "delete", "数据库删除数据出错！", `id=${id}`);
//             res.send({ code: 200, data: results, message: "删除成功！" });
//         }
//     })()
// });

// // 新增或修改
// router.post('/role_menu_relation/saveOrUpdate', function (req, res, next) {
//     (async function () {
//         let obj = req.body
//         if (!obj.id) {
//             let results = await handleDB(res, "ums_role_menu_relation", "insert", "数据库新增数据出错！", obj);
//             res.send({ code: 200, message: "新增成功！", data: results })
//         } else {
//             let results = await handleDB(res, "ums_role_menu_relation", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
//             res.send({ code: 200, message: "更新成功！", data: results })
//         }
//     })()
// });

// module.exports = router
