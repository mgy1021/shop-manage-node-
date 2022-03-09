
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 15:28:13
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_attribute_category", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_attribute_category where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_attribute_category set name=?,attribute_count=?,param_count=? where id =?", [obj.name, obj.attribute_count, obj.param_count, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_attribute_category(name,attribute_count,param_count) values(?,?,?);", [obj.name, obj.attribute_count, obj.param_count], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_attribute_category where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }