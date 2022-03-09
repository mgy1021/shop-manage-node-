/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 11:59:33
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_category", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_category where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_category set parent_id=?,name=?,level=?,product_count=?,product_unit=?,nav_status=?,show_status=?,sort=?,icon=?,keywords=?,description=? where id =?", [obj.parent_id, obj.name, obj.level, obj.product_count, obj.product_unit, obj.nav_status, obj.show_status, obj.sort, obj.icon, obj.keywords, obj.description, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_category(parent_id,name,level,product_count,product_unit,nav_status,show_status,sort,icon,keywords,description) values(?,?,?,?,?,?,?,?,?,?,?);", [obj.parent_id, obj.name, obj.level, obj.product_count, obj.product_unit, obj.nav_status, obj.show_status, obj.sort, obj.icon, obj.keywords, obj.description], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_category where id in (${ids})`, (res) => {
        // console.log(res);
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }