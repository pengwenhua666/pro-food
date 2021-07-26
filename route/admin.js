//引入express框架
const express = require('express');

//创建路由对象
const admin = express.Router();


//实现退出功能
admin.get('/logout', require('./admin/logout'));

//创建用户列表路由
admin.get('/user', require('./admin/userList'));

//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/userEdit'));

//创建用户修改信息功能
admin.post('/user-modify', require('./admin/userModify'));

//创建用户添加功能
admin.post('/user-edit', require('./admin/userAdd'));

//实现删除用户功能
admin.get('/delete', require('./admin/userDelete'));


//菜品列表
admin.get('/food',require('./admin/foodList'));

//菜品编辑
admin.get('/food-edit',require('./admin/foodEdit'));

//菜品添加
admin.post('/foodAdd', require('./admin/foodAdd'));

//菜品修改
admin.post('/foodModify', require('./admin/foodModify'));

//菜品删除
admin.get('/foodDelete', require('./admin/foodDelete'));

//订单查看
admin.get('/order', require('./admin/order'));

//将路由对象作为模块成员进行导出
module.exports = admin;