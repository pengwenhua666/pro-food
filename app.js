//引入express框架
const express = require('express');
//导入path模块处理路径
const path = require('path');
//引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入dateformat第三方模块
const dateFormat = require('dateformat');
//导入art-template模板引擎
const template = require('art-template');
//创建网站服务器
const app = express();

//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));// 此方法已被弃用
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
//配置session
app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//渲染后缀为art模板时，使用express-art-template
app.engine('art', require('express-art-template'));
//设置模板存放目录
app.set('views', path.join(__dirname, 'view'));
//设置默认拼接后缀
app.set('view engine', 'art');

//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//实现注册功能
app.get('/regist', require('./route/registPage'));
app.post('/regist', require('./route/regist'));

//实现登录功能
app.get('/login', require('./route/loginPage'));
app.post('/login', require('./route/login'));

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户登录状态
//app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误集中处理
app.use((err, req, res, next) => {
    //JSON.parse() 将字符串对象转换成对象类型
    const result = JSON.parse(err)
    //{ path: '/admin/user-edit', message: '密码比对失败，无法修改', id: id }
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口8080
app.listen(8080);
console.log('网站服务器启动成功,请访问localhost:8080');