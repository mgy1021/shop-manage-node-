
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 00:36:25
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_ladder", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_ladder where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_ladder set id=?,product_id=?,count=?,discount=?,price=? where id =?", [obj.product_id, obj.count, obj.discount, obj.price, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_ladder(product_id,count,discount,price) values(?,?,?,?,?);", [obj.product_id, obj.count, obj.discount, obj.price], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_ladder where id in (${ids})`, (res) => {
        // console.log(res);
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }