/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-30 22:07:11
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/attribute_value.js")

/**
 * @swagger
 * /product/attributeValue/findAll:
 *    get:
 *      tags:
 *      - 商品属性值    #接口分类
 *      summary: 商品属性值列表   #接口备注
 *      description: 用于展示商品属性值信息，type字段用于控制其是规格还是参数   #接口描述
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
router.get('/attributeValue/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/attributeValue/deleteById:
 *    delete:
 *      tags:
 *      - 商品属性值    #接口分类
 *      summary: 删除商品属性值   #接口备注
 *      description: 通过id删除某个商品属性值   #接口描述
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
router.get('/attributeValue/deleteById', function (req, res, next) {
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
 * /product/attributeValue/saveOrUpdate:
 *    post:
 *      tags:
 *      - 商品属性值    #接口分类
 *      summary: 商品属性值保存或更新   #接口备注
 *      description: 用于商品属性值的新增和修改   #接口描述
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
router.post('/attributeValue/saveOrUpdate', function (req, res, next) {
    console.log("res");
    saveOrUpdate(req.body, (result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/attributeValue/batchDelete:
 *    get:
 *      tags:
 *      - 商品属性值    #接口分类
 *      summary: 批量删除  #接口备注
 *      description: 用于批量删除商品属性值，参数传递例如'1,2,3'   #接口描述
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
router.get('/attributeValue/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

module.exports = router;
