/*
 * @Description: 菜单管理
 * @Author: Mogy
 * @Date: 2022-02-15 11:32:26
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 11:33:19
 */

var express = require('express');
var router = express.Router();
const pool = require('../../data/pool')


// 根据role_id查询能访问的菜单
router.get('/menuByRoleId/queryOneById', function (req, res, next) {
    if (!req.query.role_id) {
        res.send({ code: 500, message: "参数错误！", data: [] });
    } else {
        let role_id = req.query.role_id
        pool.myQuery("SELECT ums_menu.id,ums_menu.parent_id,title as name,name as route,type,icon,hidden FROM ums_role_menu_relation,ums_menu WHERE role_id = ? AND ums_role_menu_relation.menu_id = ums_menu.id", [role_id], (results) => {
            // res.send({ code: 200, data: results, message: "操作成功！" });
            res.send(results)
        })
    }
});

// 根据admin_id查询用户身份
router.get('/roleByAdminId/queryOneById', function (req, res, next) {
    if (!req.query.admin_id) {
        res.send({ code: 500, message: "参数错误！", data: [] });
    } else {
        let admin_id = req.query.admin_id
        pool.myQuery("SELECT ums_role.id,ums_role.name FROM ums_admin_role_relation,ums_role WHERE ums_admin_role_relation.admin_id=? and ums_admin_role_relation.role_id = ums_role.id", [admin_id], (results) => {
            // res.send({ code: 200, data: results, message: "操作成功！" });
            res.send(results)
        })
    }
});

module.exports = router