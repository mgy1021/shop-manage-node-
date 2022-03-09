
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 00:36:48
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_sku_stock", [], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_sku_stock where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_sku_stock set product_id=?,sku_code=?,price=?,stock=?,low_stock=?,sp1=?,sp2=?,sp3=?,pic=?,sale=?,promotion_price=?,lock_stock=? where id =?", [obj.product_id, obj.sku_code, obj.price, obj.stock, obj.low_stock, obj.sp1, obj.sp2, obj.sp3, obj.pic, obj.sale, obj.promotion_price, obj.lock_stock, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_sku_stock(product_id,sku_code,price,stock,low_stock,sp1,sp2,sp3,pic,sale,promotion_price,lock_stock) values(?,?,?,?,?,?,?,?,?,?,?,?,?);", [obj.product_id, obj.sku_code, obj.price, obj.stock, obj.low_stock, obj.sp1, obj.sp2, obj.sp3, obj.pic, obj.sale, obj.promotion_price, obj.lock_stock], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_sku_stock where id in (${ids})`, (res) => {
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete }