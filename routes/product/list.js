/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 10:39:14
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const handleDB = require("../../db/handleDB");
const { findAll, deleteById, saveOrUpdate, batchDelete, pageQuery } = require("../../data/product/list.js")

/**
 * @swagger
 * /product/list/findAll:
 *    get:
 *      tags:
 *      - 商品    #接口分类
 *      summary: 商品列表   #接口备注
 *      description: 用于展示商品信息   #接口描述
 *      operationId: "addPet"
 *      consumes:
 *      - "application/json"
 *      - "application/xml"    #接口接收参数方式
 *      produces:
 *      - "application/json"
 *      - "application/xml"
 *      responses:
 *        "405":
 *          description: "Invalid input"
 * */
router.get('/list/findAll', function (req, res, next) {
    console.log("res");
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/list/deleteById:
 *    delete:
 *      tags:
 *      - 商品    #接口分类
 *      summary: 删除商品   #接口备注
 *      description: 通过id删除某个商品   #接口描述
 *      operationId: "addPet"
 *      consumes:
 *      - "application/json"
 *      - "application/xml"    #接口接收参数方式
 *      produces:
 *      - "application/json"
 *      - "application/xml"
 *      parameters:
 *        - name: "id"
 *          description: "Pet object that needs to be added to the store"
 *          in: query
 *          required: true
 *          type: integer
 *      responses:
 *        "405":
 *          description: "Invalid input"
 * */
router.delete('/list/deleteById', function (req, res, next) {
    // deleteById(req.query.id, (result) => {
    //     if (result.affectedRows) {
    //         res.send(`删除成功${result.affectedRows}条数据！`)
    //     } else {
    //         res.send(`删除失败!`)
    //     }
    // })
    (async function () {
        const id = req.query.id
        if (!id) {
            res.send({ code: 500, data: [], message: "参数错误！" })
            return
        }
        let results = await handleDB(res, "pms_product", "delete", "删除失败！", `id=${id}`);
        res.send({ code: 200, data: results, message: "删除成功！" });
    })()
});

/**,
 * @swagger
 * /product/list/saveOrUpdate:
 *    post:
 *      tags:
 *      - 商品    #接口分类
 *      summary: 商品保存或更新   #接口备注
 *      description: 用于商品的新增和修改   #接口描述
 *      operationId: "addPet"
 *      consumes:
 *      - "application/json"
 *      - "application/xml"    #接口接收参数方式
 *      produces:
 *      - "application/json"
 *      - "application/xml"    
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Pet object that needs to be added to the store"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/Pet"
 *        example:
 *          id: 10
 *          name: "Jessica Smith"
 *      responses:
 *        "405":
 *          description: "Invalid input"
 *      security:
 *      - petstore_auth:
 *        - "write:pets"
 *        - "read:pets"
 * definitions:
 *   Pet:
 *   type: "object"
 *   required:
 *   - "name"
 *   - "photoUrls"
 *   properties:
 *     id:
 *       type: "integer"
 *       format: "int64"
 *     category:
 *       type: "integer"
 *       format: "int64"
 *     name:
 *       type: "string"
 *       example: "doggie"
 *     photoUrls:
 *       type: "array"
 *       xml:
 *         name: "photoUrl"
 *         wrapped: true
 *       items:
 *         type: "string"
 *     tags:
 *       type: "array"
 *       xml:
 *         name: "tag"
 *         wrapped: true
 *       items:
 *         type: "integer"
 *         format: "int64"
 *     status:
 *       type: "string"
 *       description: "pet status in the store"
 *       enum:
 *       - "available"
 *       - "pending"
 *       - "sold"
 *   xml:
 *     name: "Pet"
 * */
router.post('/list/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "pms_product", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增商品成功！", data: results })
        } else {
            let results = await handleDB(res, "pms_product", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新商品成功！", data: results })
        }
    })()
});

/**
 * @swagger
 * /product/list/batchDelete:
 *    get:
 *      tags:
 *      - 商品    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除商品，参数传递例如'1,2,3'   #接口描述
 *      operationId: "addPet"
 *      consumes:
 *      - "application/json"
 *      - "application/xml"    #接口接收参数方式
 *      produces:
 *      - "application/json"
 *      - "application/xml"
 *      parameters:
 *        - name: "ids"
 *          description: "Pet object that needs to be added to the store"
 *          in: query
 *          required: true
 *          type: string
 *      responses:
 *        "405":
 *          description: "Invalid input"
 * */
router.get('/list/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

// 分页查询
router.get('/list/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        const name = req.query.name
        const product_sn = req.query.product_sn
        const product_category_id = req.query.product_category_id
        const brand_id = req.query.brand_id
        const publish_status = req.query.publish_status
        const verify_status = req.query.verify_status
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (name != null && name !== "") {
            sql += ` and name like '%${name}%'`
        }
        if (product_sn != null && product_sn !== "") {
            sql += ` and product_sn like '%${product_sn}%'`
        }
        if (product_category_id != null && product_category_id !== "") {
            sql += ` and product_category_id=${product_category_id}`
        }
        if (brand_id != null && brand_id !== "") {
            sql += ` and brand_id=${brand_id}`
        }
        if (publish_status != null && publish_status !== "") {
            sql += ` and publish_status=${publish_status}`
        }
        if (verify_status != null && verify_status !== "") {
            sql += ` and verify_status=${verify_status}`
        }
        console.log(sql, "sql");
        //数据库操作
        let results = await handleDB(res, "pms_product", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "pms_product", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

// id查询
router.get('/list/queryOneById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "pms_product", "find", "数据库查找数据出错！", `id=${id}`);
            res.send({ code: 200, data: results.pop(), message: "操作成功！" });
        }
    })()
});

module.exports = router;
