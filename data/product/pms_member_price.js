/*
 * @Description:商品会员价格表
 * @Author: Mogy
 * @Date: 2021-12-01 16:11:23
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:17:24
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_member_price", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_member_price where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_member_price set product_id=?,member_level_id=?,member_price=?,member_level_name=? where id =?", [obj.product_id, obj.member_level_id, obj.member_price, obj.member_level_name, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_member_price(product_id,member_level_id,member_price,member_level_name) values(?,?,?);", [obj.product_id, obj.member_level_id, obj.member_price, obj.member_level_name], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_member_price where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }