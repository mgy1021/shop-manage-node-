/*
 * @Description:产品评论回复表
 * @Author: Mogy
 * @Date: 2021-12-01 16:32:08
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:37:25
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_comment_replay", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_comment_replay where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_comment_replay set comment_id=?,member_nick_name=?,member_icon=?,content=?,create_time=?,type=? where id =?", [obj.comment_id, obj.member_nick_name, obj.member_icon, obj.content, obj.create_time, obj.type, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_comment_replay(comment_id,member_nick_name,member_icon,content,create_time,type) values(?,?,?);", [obj.comment_id, obj.member_nick_name, obj.member_icon, obj.content, obj.create_time, obj.type], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_comment_replay where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }