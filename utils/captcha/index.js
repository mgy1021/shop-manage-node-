/*
 * @Description: 生成验证码的工具类
 * @Author: Mogy
 * @Date: 2021-12-10 14:55:31
 * @LastEditors: Mogy
 * @LastEditTime: 2021-12-10 15:00:56
 */

// 安装：yarn add svg-captcha
var svgCaptcha = require('svg-captcha');


class Captcha {


    getCode () {
        var captcha = svgCaptcha.create({
            inverse: false, // 翻转颜色 
            fontSize: 48, // 字体大小 
            noise: 2, // 噪声线条数 
            width: 100, // 宽度 
            height: 40, // 高度 
            size: 4,// 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        });
        return captcha
    }

}


// let captchaObj = new Captcha();
// let captcha = captchaObj.getCode();

// captcha.text是图片验证码文本
// console.log(captcha.text)

// console.log(captcha.text.toLowerCase());

// captcha.data是图片验证码图片内容信息
// console.log(String(captcha.data));    //将来要发送给客户端的数据


module.exports = Captcha