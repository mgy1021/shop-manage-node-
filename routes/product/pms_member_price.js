/*
 * @Description:商品会员价格表
 * @Author: Mogy
 * @Date: 2021-12-01 16:11:04
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:19:08
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/pms_member_price.js")

/**
 * @swagger
 * /product/pms_member_price/findAll:
 *    get:
 *      tags:
 *      - 商品会员价格    #接口分类
 *      summary: 商品会员价格列表   #接口备注
 *      description: 根据不同会员等级，可以以不同的会员价格购买。此处设计有缺陷，可以做成不同会员等级可以减免多少元或者按多少折扣进行购买。   #接口描述
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
router.get('/pms_member_price/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_member_price/deleteById:
 *    delete:
 *      tags:
 *      - 商品会员价格    #接口分类
 *      summary: 删除   #接口备注
 *      description: 通过id删除某个商品会员价格   #接口描述
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
router.delete('/pms_member_price/deleteById', function (req, res, next) {
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
 * /product/pms_member_price/saveOrUpdate:
 *    post:
 *      tags:
 *      - 商品会员价格    #接口分类
 *      summary: 保存或更新   #接口备注
 *      description: 用于商品会员价格的新增和修改   #接口描述
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
router.post('/pms_member_price/saveOrUpdate', function (req, res, next) {
    console.log("res");
    saveOrUpdate(req.body, (result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_member_price/batchDelete:
 *    get:
 *      tags:
 *      - 商品会员价格    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除商品会员价格，参数传递例如'1,2,3'   #接口描述
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
router.get('/pms_member_price/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

module.exports = router;
