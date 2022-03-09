/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-11-26 09:35:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 09:20:56
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var logger = require('morgan');
// const swagger = require('./swagger/config')
const { loginInterception } = require("./utils/common")
var app = express();

app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 设置 session 的有效时间，单位毫秒
    },
}));

// 使用自定义中间件处理跨域
app.use((req, res, next) => {
    // 设置响应头部
    res.header("Access-Control-Allow-Origin", "http://192.168.0.106:9528")
    res.header("Access-Control-Allow-Headers", "X-Requested-With,token,content-type,session")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1")
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Content-Type", "application/json;charset=utf-8")
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('./routes/passport');

// 商品相关接口
var productCategoryRouter = require('./routes/product/category');
var productListRouter = require('./routes/product/list');
var productTypeRouter = require('./routes/product/type');
var productAttributeRouter = require('./routes/product/attribute');
var productParameterRouter = require('./routes/product/parameter');
var productBrandRouter = require('./routes/product/brand');
var productAttributeValueRouter = require('./routes/product/attribute_value');
var productStockRouter = require('./routes/product/stock');
var productLadderRouter = require('./routes/product/pms_product_ladder');
var productFullReductionRouter = require('./routes/product/full_reduction');
var productMemberPriceRouter = require('./routes/product/pms_member_price');
var productCommentRouter = require('./routes/product/pms_comment');
var productCommentReplayRouter = require('./routes/product/pms_comment_replay');
var productVertifyRecordRouter = require('./routes/product/pms_product_vertify_record');

// 订单相关接口
let orderListRouter = require("./routes/order/orderList")
let orderItemRouter = require("./routes/order/orderItem")
let orderOperateHistoryRouter = require("./routes/order/orderOperateHistory")
let orderReturnReasonRouter = require("./routes/order/orderReturnReason")
let returnOrdersRouter = require("./routes/order/returnOrders")
let companyAddressRouter = require("./routes/order/companyAddress")
let orderSettingRouter = require("./routes/order/orderSetting")

// 营销相关接口
let seckillActivityRouter = require("./routes/marketing/seckillActivity")
let flashPromotionSessionRouter = require("./routes/marketing/flash_promotion_session")
let flashPromotionProductRelationRouter = require("./routes/marketing/flash_promotion_product_relation")
let homeBrandRouter = require("./routes/marketing/home_brand")
let homeNewProductRouter = require("./routes/marketing/home_new_product")
let homeRecommendProduct = require("./routes/marketing/home_recommend_product")
let homeRecommendSubjectProduct = require("./routes/marketing/home_recommend_subject")
let subjectRouter = require("./routes/marketing/subject")
let homeAdvertiseRouter = require("./routes/marketing/home_advertise")
let couponRouter = require("./routes/marketing/coupon")
let coupon_product_category_relationRouter = require("./routes/marketing/coupon_product_category_relation")
let coupon_product_relationRouter = require("./routes/marketing/coupon_product_relation")
let couponHistoryRouter = require("./routes/marketing/coupon_history")
let subjectProductRelation = require("./routes/marketing/subject_product_relation")


// 权限管理相关接口
let userListRouter = require("./routes/authority/userList")
let roleListRouter = require("./routes/authority/roleList")
let ums_admin_role_relationRouter = require("./routes/authority/ums_admin_role_relation")
let resourceRouter = require("./routes/authority/resource")
let resource_categoryRouter = require("./routes/authority/resource_category")
let menuRouter = require("./routes/authority/menu")
let role_menu_relationRouter = require("./routes/authority/role_menu_relation")
let findMenuByRoleIdRouter = require("./routes/authority/findMenuByRoleId")

//配置路由
let imgUpdateRouter = require("./routes/utils/imgUpdate")

// view engine setup视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
require("./swagger/config")(app);

app.use('/', indexRouter);
app.use('/users', loginInterception, usersRouter);
app.use('/passport', [passport]);
app.use('/product', loginInterception, [productCategoryRouter, productListRouter, productTypeRouter, productAttributeRouter, productParameterRouter, productBrandRouter, productAttributeValueRouter, productStockRouter, productLadderRouter, productFullReductionRouter, productMemberPriceRouter, productCommentRouter, productCommentReplayRouter, productVertifyRecordRouter]);
app.use('/order', loginInterception, [orderListRouter, orderItemRouter, orderOperateHistoryRouter, orderReturnReasonRouter, returnOrdersRouter, companyAddressRouter, orderSettingRouter]);
app.use('/authority', loginInterception, [userListRouter, roleListRouter, ums_admin_role_relationRouter, resourceRouter, resource_categoryRouter, menuRouter, role_menu_relationRouter, findMenuByRoleIdRouter]);
app.use("/marketing", [seckillActivityRouter, flashPromotionSessionRouter, flashPromotionProductRelationRouter, homeBrandRouter, homeNewProductRouter, homeRecommendProduct, homeRecommendSubjectProduct, subjectRouter, homeAdvertiseRouter, couponRouter, coupon_product_category_relationRouter, coupon_product_relationRouter, couponHistoryRouter, subjectProductRelation])
app.use("/config", [imgUpdateRouter])
// swagger(app)
// catch 404 and forward to error handler捕获404并转发到错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler错误处理程序
app.use(function (err, req, res, next) {
    // set locals, only providing error in development设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
