//导入bcrypt模块
const bcrypt = require('bcrypt');
//导入用户集合构造函数
const { User } = require('../model/user');

module.exports = async(req, res) => {
    //接收请求参数
    const { tel, password } = req.body;
    //如果用户没有输入手机号码或密码
     if (tel.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '手机号码或密码错误' })
     }
    //根据手机号码查询用户
    //如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
    //如果没有查询到用户 user变量为空
    let user = await User.findOne({tel: tel});
    //查询到了用户
    if (user) {
        //将客户端传递过来的密码与用户信息中的密码进行比对，返回true或false
        //let isEqual = await bcrypt.compare(password, user.password);
        if (password == user.password) {
            //将用户名存储在请求对象中
            req.session.username = user.username;
            //将用户角色存储在session对象中
            req.session.role = user.role;
            //将用户信息存放在locals对象下，使所有模板都能获取此数据，req.app相当于app
            req.app.locals.userInfo = user;
            if (user.role == '管理员') {
                //重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                //重定向到系统首页
                res.redirect('/home/');
            }

        } else {
            return res.status(400).render('admin/error', { msg: '手机号码或密码错误' })
        }
    } else {
        return res.status(400).render('admin/error', { msg: '手机号码或密码错误' })
    }
}