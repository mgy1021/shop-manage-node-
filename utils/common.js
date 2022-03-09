/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-12-10 21:23:44
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-19 22:49:54
 */
// 公共的工具函数

const { token } = require("morgan");
var handleDB = require('../db/handleDB');
const jwt = require("jsonwebtoken")
const keys = require("../config")


function getRandomString (n) {
    var str = "";
    while (str.length < n) {
        str += Math.random().toString(36).substr(2);
    }
    return str.substr(str.length - n)
}

function csrfProtect (req, res, next) {
    let method = req.method
    if (method == "GET") {
        let csrf_token = getRandomString(48);
        res.cookie('csrf_token', csrf_token);
        next() //执行跳转到下一个函数执行，即app.use(beforeReq,router)中的下一个
    } else if (method == "POST") {
        // 判断响应头中的x-csrftoken值，和cookies中的csrf_token进行对比
        console.log(req.headers["x-csrftoken"]);
        console.log(req.cookies["csrf_token"]);

        if ((req.headers["x-csrftoken"] === req.cookies["csrf_token"])) {
            console.log("csrf验证通过！");
            next()
        } else {
            res.send({ message: "csrf验证不通过!" });
            return
        }
    }
}

// 登录拦截
function loginInterception (req, res, next) {
    const { token } = req.headers
    console.log(token);
    if (!token) {
        res.send({ code: 401, data: [], message: '用户未登录!' })
        return
    } else {
        jwt.verify(token, keys.jwt_key, async (error, decoded) => {
            if (error) {
                res.send({ code: 401, data: [], message: "token无效！" })
                return
            }
            next()
            // const { username, password } = decoded
            // let result = await handleDB(res, "ums_admin", "find", "数据库查询出错！", `username="${username}"`)
            // // 如果不存在
            // if (!result[0]) {
            //     res.send({ code: 500, data: [], message: "" })
            //     return
            // }
            // // 校验密码，如果不正确，return
            // if (password !== result[0].password) {
            //     res.send({ code: 500, data: [], message: "token无效！" })
            //     return
            // }
            // res.send({ code: 200, data: result, message: "操作成功!" })
        })
    }
}
module.exports = {
    // csrfProtect
    loginInterception
}