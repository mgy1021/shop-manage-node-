/*
 * @Description:产品评论回复表
 * @Author: Mogy
 * @Date: 2021-12-01 16:38:13
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-01 16:40:23
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/pms_comment_replay.js")

/**
 * @swagger
 * /product/pms_comment_replay/findAll:
 *    get:
 *      tags:
 *      - 产品评价回复    #接口分类
 *      summary: 产品评价回复列表   #接口备注
 *      description: 用于展示产品评价回复   #接口描述
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
router.get('/pms_comment_replay/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_comment_replay/deleteById:
 *    delete:
 *      tags:
 *      - 产品评价回复    #接口分类
 *      summary: 删除   #接口备注
 *      description: 通过id删除某个产品评价回复   #接口描述
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
router.delete('/pms_comment_replay/deleteById', function (req, res, next) {
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
 * /product/pms_comment_replay/saveOrUpdate:
 *    post:
 *      tags:
 *      - 产品评价回复    #接口分类
 *      summary: 保存或更新   #接口备注
 *      description: 用于产品评价回复的新增和修改   #接口描述
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
router.post('/pms_comment_replay/saveOrUpdate', function (req, res, next) {
    console.log("res");
    saveOrUpdate(req.body, (result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_comment_replay/batchDelete:
 *    get:
 *      tags:
 *      - 产品评价回复    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除产品评价回复，参数传递例如'1,2,3'   #接口描述
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
router.get('/pms_comment_replay/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

module.exports = router;
