
/*
 * @Description:商品评价表
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:25:41
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_comment", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_comment where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_comment set product_id=?,member_nick_name=?,product_name=?,star=?,member_ip=?,create_time=?,show_status=?,product_attribute=?,collect_couont=?,read_count=?,content=?,pics=?,member_icon=?,replay_count=? where id =?", [obj.product_id, obj.member_nick_name, obj.product_name, obj.star, obj.member_ip, obj.create_time, obj.show_status, obj.product_attribute, obj.collect_couont, obj.read_count, obj.content, obj.pics, obj.member_icon, obj.replay_count, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_comment(product_id,member_nick_name,product_name,star,member_ip,create_time,show_status,product_attribute,collect_couont,read_count,content,pics,member_icon,replay_count) values(?,?,?);", [obj.product_id, obj.member_nick_name, obj.product_name, obj.star, obj.member_ip, obj.create_time, obj.show_status, obj.product_attribute, obj.collect_couont, obj.read_count, obj.content, obj.pics, obj.member_icon, obj.replay_count], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_comment where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }