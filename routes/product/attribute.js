/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 09:42:50
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const handleDB = require("../../db/handleDB");
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/attribute.js")

/**
 * @swagger
 * /product/attribute/findAll:
 *    get:
 *      tags:
 *      - 商品属性    #接口分类
 *      summary: 商品属性列表   #接口备注
 *      description: 用于展示商品属性信息，type字段用于控制其是规格还是参数   #接口描述
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
router.get('/attribute/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/attribute/deleteById:
 *    delete:
 *      tags:
 *      - 商品属性    #接口分类
 *      summary: 删除商品属性   #接口备注
 *      description: 通过id删除某个商品属性   #接口描述
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
router.delete('/attribute/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "pms_product_attribute", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

/**,
 * @swagger
 * /product/attribute/saveOrUpdate:
 *    post:
 *      tags:
 *      - 商品属性    #接口分类
 *      summary: 商品属性保存或更新   #接口备注
 *      description: 用于商品属性的新增和修改   #接口描述
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
router.post('/attribute/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "pms_product_attribute", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增商品属性成功！", data: results })
        } else {
            let results = await handleDB(res, "pms_product_attribute", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新商品属性成功！", data: results })
        }
    })()
});

/**
 * @swagger
 * /product/attribute/batchDelete:
 *    get:
 *      tags:
 *      - 商品属性    #接口分类
 *      summary: 批量删除  #接口备注
 *      description: 用于批量删除商品属性，参数传递例如'1,2,3'   #接口描述
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
router.get('/attribute/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

// 分页查询
router.get('/attribute/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        // let isTotal = false
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        let product_attribute_category_id = req.query.product_attribute_category_id
        let type = req.query.type
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (product_attribute_category_id != null && product_attribute_category_id !== "") {
            sql += ` and product_attribute_category_id=${product_attribute_category_id}`
            // isTotal = true
        }
        if (type != null && type !== "") {
            sql += ` and type=${type}`
            // isTotal = true
        }
        //数据库操作
        let results = await handleDB(res, "pms_product_attribute", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "pms_product_attribute", "find", "数据库分页查询数据出错！", sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});
module.exports = router;
