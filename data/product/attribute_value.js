
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 00:35:53
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_attribute_value", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_attribute_value where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_attribute_value set product_id=?,product_attribute_id=?,value=? where id =?", [obj.product_id, obj.product_attribute_id, obj.value, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_attribute_value(product_id,product_attribute_id,value) values(?,?,?,?);", [obj.product_id, obj.product_attribute_id, obj.value], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_attribute_value where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }