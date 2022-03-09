/*
 * @Description: 验证接口
 * @Author: Mogy
 * @Date: 2021-12-10 11:56:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 14:34:53
 */
var express = require('express');
var Captcha = require('../utils/captcha/index');
var handleDB = require('../db/handleDB');
var router = express.Router();
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const keys = require("../config")

// 获取验证码
router.get('/get_code/:id', function (req, res, next) {
    let captchaObj = new Captcha();
    let captcha = captchaObj.getCode();
    // 保存图片验证码文本到session中
    req.session["ImageCode"] = captcha.text;
    // console.log(req.session);
    res.setHeader('Content-Type', 'image/svg+xml')
    console.log(req.session["ImageCode"].toLowerCase());
    res.send(captcha.data)
});

// 注册用户
router.post('/register', function (req, res, next) {
    (async function () {
        // 1、获取post参数，判断是否为空
        let { username, password, image_code } = req.body
        if (!username || !image_code || !password) {
            res.send({ code: 500, data: [], message: "缺少参数" })
            return
        }
        console.log(image_code.toLowerCase(), req.session["ImageCode"].toLowerCase());
        // 2、验证用户输入的验证码是否正确
        if (image_code.toLowerCase() !== req.session["ImageCode"].toLowerCase()) {
            res.send({ code: 500, data: [], message: "验证码错误！" })
            return
        }
        // 3、查询数据库，看看用户是不是注册了
        let result = await handleDB(res, "ums_admin", "find", "数据库查询出错！", `username="${username}"`)
        // 4、如果已经存在，返回用户名已经被注册了
        if (result[0]) {
            res.send({ code: 500, data: [], message: "用户已经被注册了！" })
            return
        }
        // 5、如果不存在，注册用户写入数据库
        let result2 = await handleDB(res, "ums_admin", "insert", "数据库插入数据出错！", { username, password: md5(md5(password) + keys.password_key), nick_name: username })
        // 6、保持用户登录状态
        req.session["user_id"] = result2.insertId
        // 7、返回注册成功给前端
        res.send({ code: 200, data: [], message: "注册成功!" })
    })()
});

//登录
router.post('/login', function (req, res, next) {
    (async function () {
        // 1、获取post请求参数，判空
        let { username, password } = req.body
        if (!username || !password) {
            res.send({ code: 500, data: [], message: "缺少参数！" })
        }
        // 2、查询数据库，判断用户是否存在
        let result = await handleDB(res, "ums_admin", "find", "数据库查询出错！", `username="${username}"`)
        // 3、如果不存在，返回用户名未注册
        if (!result[0]) {
            res.send({ code: 500, data: [], message: "用户名未注册，登录失败！" })
            return
        }
        // 4、校验密码，如果不正确，return
        if (md5(md5(password) + keys.password_key) !== result[0].password) {
            res.send({ code: 500, data: [], message: "密码不正确，登录失败!" })
            return
        }
        const token = jwt.sign({ username, password: md5(md5(password) + keys.password_key) }, keys.jwt_key, { expiresIn: 60 * 60 * 2 })

        // 5、保持用户登录状态
        req.session["user_id"] = result[0].insertId
        // 6、返回登录成功给前端
        res.send({ code: 200, data: { token }, message: "登录成功！" });
    })()
});

router.post("/logout", (req, res) => {
    // 退出登录
    // 删除session中的user_id
    delete req.session["user_id"]
    res.send({ code: 200, data: [], message: "退出登录成功！" })
})


// 获取用户信息
router.get("/getUserInfo", (req, res) => {
    (async function () {
        console.log(req.query);
        const { token } = req.query
        if (token == null || token == "") {
            res.send({ code: 500, data: [], message: "参数错误!" })
        }
        jwt.verify(token, keys.jwt_key, async (error, decoded) => {
            if (error) {
                res.send({ code: 500, data: [], message: "token无效！" })
                return
            }
            const { username } = decoded
            let result = await handleDB(res, "ums_admin", "find", "数据库查询出错！", `username="${username}"`)
            res.send({ code: 200, data: result.pop(), message: "操作成功!" })
        })
    })()
})

module.exports = router;