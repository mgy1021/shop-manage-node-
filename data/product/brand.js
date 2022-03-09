
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 16:08:23
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_brand", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_brand where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_brand set name=?,first_letter=?,sort=?,factory_status=?,show_status=?,product_count=?,product_comment_count=?,logo=?,big_pic=?,brand_story=? where id =?", [obj.name, obj.first_letter, obj.sort, obj.factory_status, obj.show_status, obj.product_count, obj.product_comment_count, obj.logo, obj.big_pic, obj.brand_story, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_brand(name,first_letter,sort,factory_status,show_status,product_count,product_comment_count,logo,big_pic,brand_story) values(?,?,?,?,?,?,?,?,?,?);", [obj.name, obj.first_letter, obj.sort, obj.factory_status, obj.show_status, obj.product_count, obj.product_comment_count, obj.logo, obj.big_pic, obj.brand_story], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_brand where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }