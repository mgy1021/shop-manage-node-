/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 00:00:18
 */
var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const handleDB = require("../../db/handleDB");
const { findAll, deleteById, saveOrUpdate, batchDelete } = require("../../data/product/stock.js")

/**
 * @swagger
 * /product/pms_sku_stock/findAll:
 *    get:
 *      tags:
 *      - 库存    #接口分类
 *      summary: 所有库存量列表   #接口备注
 *      description: 用于展示商品库存量信息,SKU(Stock Keeping Unit)是指库存量单位，SPU(Standard Product Unit)是指标准产品单位。举个例子：iphone xs是一个SPU，而iphone xs 公开版 64G 银色是一个SKU。   #接口描述
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
router.get('/pms_sku_stock/findAll', function (req, res, next) {
    findAll((result) => {
        res.send(result)
    })
});

/**
 * @swagger
 * /product/pms_sku_stock/deleteById:
 *    delete:
 *      tags:
 *      - 库存    #接口分类
 *      summary: 删除库存   #接口备注
 *      description: 通过id删除某个商品的库存量   #接口描述
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
router.delete('/pms_sku_stock/deleteById', function (req, res, next) {
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
 * /product/pms_sku_stock/saveOrUpdate:
 *    post:
 *      tags:
 *      - 库存    #接口分类
 *      summary: 库存保存或更新   #接口备注
 *      description: 用于商品库存的新增和修改   #接口描述
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

// 新增或修改
router.post('/pms_sku_stock/saveOrUpdate', function (req, res, next) {
    (async function () {
        let obj = req.body
        if (!obj.id) {
            let results = await handleDB(res, "pms_sku_stock", "insert", "数据库新增数据出错！", obj);
            res.send({ code: 200, message: "新增SKU库存成功！", data: results })
        } else {
            let results = await handleDB(res, "pms_sku_stock", "update", "数据库更新数据出错！", `id=${obj.id}`, obj);
            res.send({ code: 200, message: "更新SKU库存成功！", data: results })
        }
    })()
});

/**
 * @swagger
 * /product/pms_sku_stock/batchDelete:
 *    get:
 *      tags:
 *      - 库存    #接口分类
 *      summary: 批量删除   #接口备注
 *      description: 用于批量删除商品库存量，参数传递例如'1,2,3'   #接口描述
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
router.get('/pms_sku_stock/batchDelete', function (req, res, next) {
    batchDelete(req.query.ids, (result) => {
        res.send("批量删除成功！")
    })
});

// 分页查询
router.get('/pms_sku_stock/pageQuery', function (req, res, next) {
    (async function () {
        let sql = "1=1"
        //获取参数， 判空
        const pageSize = parseInt(req.query.pageSize)
        const pageNum = parseInt(req.query.pageNum)
        let product_id = req.query.product_id
        if (!pageSize || !pageNum) {
            res.send({ code: 500, message: "参数错误！", data: [] });
        }
        if (product_id != null && product_id !== "") {
            sql += ` and product_id=${product_id}`
        }
        //数据库操作
        let results = await handleDB(res, "pms_sku_stock", "limit", "数据库分页查询数据出错！", { where: sql, number: pageNum, count: pageSize });
        let total = await handleDB(res, "pms_sku_stock", "find", "数据库分页查询数据出错！", sql);
        console.log(sql);
        //查询到的结果返回页面中去
        res.send({ code: 200, message: "操作成功！", data: results, total: total.length });
    })();
});

module.exports = router;
