/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 23:16:10
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const handleDB = require("../../db/handleDB");
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/full_reduction.js")

/**
 * @swagger
 * /product/pms_product_full_reduction/findAll:
 *    get:
 *      tags:
 *      - 商品满减    #接口分类
 *      summary: 商品满减列表   #接口备注
 *      description: 用于展示商品满减列表,商品优惠相关表，购买同商品满足一定金额后，可以减免一定金额。如：买满1000减100元。   #接口描述
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
router.get('/pms_product_full_reduction/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_product_full_reduction/deleteById:
 *    delete:
 *      tags:
 *      - 商品满减    #接口分类
 *      summary: 删除商品满减  #接口备注
 *      description: 通过id删除某个商品满减。   #接口描述
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
router.delete('/pms_product_full_reduction/deleteById', function (req, res, next) {
    deleteById(req.query.id, (result) => {
        if (result.affectedRows) {
            res.send(`删除成功${result.affectedRows}条数据！`)
        } else {
            res.send(`删除失败!`)
        }
    })
});

/**,
 * @swagger
 * /product/pms_product_full_reduction/saveOrUpdate:
 *    post:
 *      tags:
 *      - 商品满减    #接口分类
 *      summary: 商品满减保存或更新   #接口备注
 *      description: 用于商品满减的新增和修改   #接口描述
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
router.post('/product_full_reduction/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "pms_product_full_reduction", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增商品满减成功！", data: results })
        } else {
            let results = await handleDB(res, "pms_product_full_reduction", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新商品满减成功！", data: results })
        }
    })()
});

/**
 * @swagger
 * /product/pms_product_full_reduction/batchDelete:
 *    get:
 *      tags:
 *      - 商品满减    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除商品满减，参数传递例如'1,2,3'   #接口描述
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
router.get('/pms_product_full_reduction/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

module.exports = router;
