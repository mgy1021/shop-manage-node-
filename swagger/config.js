/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 16:36:51
 * @LastEditors: Mogy
 * @LastEditTime: 2021-11-27 11:12:14
 */
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
// const config = require('../config/default');

const options = {
    definition: {
        // swagger 采用的 openapi 版本 不用改
        openapi: '3.0.3',
        // swagger 页面基本信息 自由发挥
        info: {
            title: '后台管理系统接口',
            version: '创建时间：2021年11月27日',
        }
    },
    apis: [path.join(__dirname, '../routes/**/*.js')]//这里指明接口路由存放的文件夹。楼主放在根路径的router下
}
const swaggerSpec = swaggerJSDoc(options)

module.exports = (app) => {
    // 开放 swagger 相关接口，
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
