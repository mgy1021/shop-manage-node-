/*
 * @Description:用于记录商品审核记录
 * @Author: Mogy
 * @Date: 2021-12-01 16:42:53
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:44:37
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_vertify_record", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_vertify_record where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_vertify_record set product_id=?,create_time=?,vertify_man=?,status=?,detail=? where id =?", [obj.product_id, obj.create_time, obj.vertify_man, obj.status, obj.detail, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_vertify_record(product_id,create_time,vertify_man,status,detail) values(?,?,?);", [obj.product_id, obj.create_time, obj.vertify_man, obj.status, obj.detail], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_vertify_record where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }