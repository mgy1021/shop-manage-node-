
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-26 15:53:12
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product_attribute", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product_attribute where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product_attribute set product_attribute_category_id=?,name=?,select_type=?,input_type=?,input_list=?,sort=?,filter_type=?,search_type=?,related_status=?,hand_add_status=?,type=? where id =?", [obj.product_attribute_category_id, obj.name, obj.select_type, obj.input_type, obj.input_list, obj.sort, obj.filter_type, obj.search_type, obj.related_status, obj.hand_add_status, obj.type, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product_attribute(product_attribute_category_id,name,select_type,input_type,input_list,sort,filter_type,search_type,related_status,hand_add_status,type) values(?,?,?,?,?,?,?,?,?,?,?);", [obj.product_attribute_category_id, obj.name, obj.select_type, obj.input_type, obj.input_list, obj.sort, obj.filter_type, obj.search_type, obj.related_status, obj.hand_add_status, obj.type], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product_attribute where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }