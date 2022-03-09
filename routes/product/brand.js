/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 11:54:01
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const handleDB = require("../../db/handleDB");
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/brand.js")

/**
 * @swagger
 * /product/brand/findAll:
 *    get:
 *      tags:
 *      - 品牌    #接口分类
 *      summary: 品牌列表   #接口备注
 *      description: 用于展示所有的品牌信息   #接口描述
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
router.get('/brand/findAll', function (req, res, next) {
    (async function () {
        let results = await handleDB(res, "pms_brand", "find", "服务器错误！")
        res.send({ code: 200, message: "操作成功！", data: results })
    })()
});

/**
 * @swagger
 * /product/brand/deleteById:
 *    delete:
 *      tags:
 *      - 品牌    #接口分类
 *      summary: 删除品牌   #接口备注
 *      description: 通过id删除某个品牌   #接口描述
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
router.delete('/brand/deleteById', function (req, res, next) {
    (async function () {
        if (!req.query.id) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        } else {
            let id = req.query.id
            let results = await handleDB(res, "pms_brand", "delete", "数据库删除数据出错！", `id=${id}`);
            res.send({ code: 200, data: results, message: "删除成功！" });
        }
    })()
});

/**,
 * @swagger
 * /product/brand/saveOrUpdate:
 *    post:
 *      tags:
 *      - 品牌    #接口分类
 *      summary: 品牌保存或更新   #接口备注
 *      description: 用于品牌的新增和修改   #接口描述
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
router.post('/brand/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "pms_brand", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增商品品牌成功！", data: results })
        } else {
            let results = await handleDB(res, "pms_brand", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新商品品牌成功！", data: results })
        }
    })()
});


/**
 * @swagger
 * /product/brand/batchDelete:
 *    get:
 *      tags:
 *      - 品牌    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除品牌，参数传递例如'1,2,3'   #接口描述
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
router.get('/brand/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

// 分页查询
router.get('/brand/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        let isTotal = false
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        let name = req.query.name
        let id = req.query.id
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (name != null && name !== "") {
            sql += ` and name like '%${name}%'`
            isTotal = true
        }
        if (id != null && id !== "") {
            sql += ` and id=${id}`
            isTotal = true
        }
        //数据库操作
        let results = await handleDB(res, "pms_brand", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "pms_brand", "find", "数据库分页查询数据出错！", sql);
        // console.log(results.length, total.length);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: isTotal == true ? results.length : total.length });
    })();
});

module.exports = router;
