
/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-11-26 10:53:15
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-10 09:55:32
 */
const pool = require('../pool')

function findAll (fun) {
    pool.myQuery("select * from pms_product", [], (res) => {
        fun(res)
    })
}

function pageQuery (pageSize, calculation_offset, fun) {
    pool.myQuery("select * from pms_product limit ? offset ?", [pageSize, calculation_offset], (res) => {
        fun(res)
    })
}

function deleteById (id, fun) {
    pool.myQuery("delete  from pms_product where id=?", [id], (res) => {
        fun(res)
    })
}

function saveOrUpdate (obj, fun) {
    if (obj.id) {
        pool.myQuery("update  pms_product set brand_id=?,product_category_id=?,feight_template_id=?,product_attribute_category_id=?,name=?,pic=?,product_sn=?,delete_status=?,publish_status=?,new_status=?,recommand_status=?,verify_status=?,sort=?,sale=?,price=?,promotion_price=?,gift_growth=?,gift_point=?,use_point_limit=?,sub_title=?,description=?,original_price=?,stock=?,low_stock=?,unit=?,weight=?,preview_status=?,service_ids=?,keywords=?,note=?,album_pics=?,detail_title=?,detail_desc=?,detail_html=?,detail_mobile_html=?,promotion_start_time=?,promotion_end_time=?,promotion_per_limit=?,promotion_type=?,product_category_name=?,brand_name=? where id =?", [obj.brand_id, obj.product_category_id, obj.feight_template_id, obj.product_attribute_category_id, obj.name, obj.pic, obj.product_sn, obj.delete_status, obj.publish_status, obj.new_status, obj.recommand_status, obj.verify_status, obj.sort, obj.sale, obj.price, obj.promotion_price, obj.gift_growth, obj.gift_point, obj.use_point_limit, obj.sub_title, obj.description, obj.original_price, obj.stock, obj.low_stock, obj.unit, obj.weight, obj.preview_status, obj.service_ids, obj.keywords, obj.note, obj.album_pics, obj.detail_title, obj.detail_desc, obj.detail_html, obj.detail_mobile_html, obj.promotion_start_time, obj.promotion_end_time, obj.promotion_per_limit, obj.promotion_type, obj.product_category_name, obj.brand_name, obj.id], (res) => {
            fun(res)
        })
    } else {
        pool.myQuery("insert into pms_product(brand_id,product_category_id,feight_template_id,product_attribute_category_id,name,pic,product_sn,delete_status,publish_status,new_status,recommand_status,verify_status,sort,sale,price,promotion_price,gift_growth,gift_point,use_point_limit,sub_title,description,original_price,stock,low_stock,unit,weight,preview_status,service_ids,keywords,note,album_pics,detail_title,detail_desc,detail_html,detail_mobile_html,promotion_start_time,promotion_end_time,promotion_per_limit,promotion_type,product_category_name,brand_name) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [obj.brand_id, obj.product_category_id, obj.feight_template_id, obj.product_attribute_category_id, obj.name, obj.pic, obj.product_sn, obj.delete_status, obj.publish_status, obj.new_status, obj.recommand_status, obj.verify_status, obj.sort, obj.sale, obj.price, obj.promotion_price, obj.gift_growth, obj.gift_point, obj.use_point_limit, obj.sub_title, obj.description, obj.original_price, obj.stock, obj.low_stock, obj.unit, obj.weight, obj.preview_status, obj.service_ids, obj.keywords, obj.note, obj.album_pics, obj.detail_title, obj.detail_desc, obj.detail_html, obj.detail_mobile_html, obj.promotion_start_time, obj.promotion_end_time, obj.promotion_per_limit, obj.promotion_type, obj.product_category_name, obj.brand_name], (res) => {
            fun(res)
        })
    }
}

function batchDelete (ids, fun) {
    pool.myQuery(`delete  from pms_product where id in (${ids})`, (res) => {
        // console.log(res);
        fun(res)
    })
}

module.exports = { findAll, deleteById, saveOrUpdate, batchDelete, pageQuery }