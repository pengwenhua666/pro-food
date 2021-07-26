//引入express框架
const express = require('express');
//创建路由对象
const home = express.Router();

//首页展示
home.get('/', require('./home/index'));

//详情展示页面
home.get('/food', require('./home/food'));

//创建评论功能路由
home.post('/comment', require('./home/comment'));

//购物车展示页面
home.get('/myorder', require('./home/myorder'));

//订单展示页面
home.get('/mycar', require('./home/mycar'));

//购物车增删改
home.get('/shopcar', require('./home/shopcar'));


//删除物品
home.get('/remove', require('./home/remove'));

//支付
home.get('/pay', require('./home/pay'));

//用户退出
home.get('/home_logout', require('./home/home_logout'));


//将路由对象作为模块成员进行导出
module.exports = home;