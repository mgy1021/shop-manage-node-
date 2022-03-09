
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 00:33:01
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_full_reduction", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_full_reduction where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_full_reduction set product_id=?,full_price=?,reduce_price=? where id =?", [obj.product_id, obj.full_price, obj.reduce_price, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_full_reduction(product_id,full_price,reduce_price) values(?,?,?);", [obj.product_id, obj.full_price, obj.reduce_price], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_full_reduction where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }