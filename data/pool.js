/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-20 16:40:16
 */
const mysql = require("mysql")
// 1.创建连接池对象
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shop-manage"
})

// 获取连接对象，执行sql语句，将执行结果返回
pool.myQuery = function (sql, params, fun) {
    this.getConnection((err, conn) => {
        // 如果不出错，conn就是连接对象
        if (err) throw err;
        // 3.使用连接对象执行sql语句，并处理结果
        conn.query(sql, params, (error, result) => {
            if (error) {
                fun({
                    code: 500,
                    message: error,
                    data: []
                })
                throw error;
            }
            fun({
                code: 200,
                message: "操作成功！",
                data: result
            })
        })
        //释放连接对象
        conn.release();
    })
}

module.exports = pool
