//引入用户集合模块
const { User, validateUser } = require('../model/user');
//引入加密模块bcrypt
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    try {
        await validateUser(req.body)
    } catch (error) {
        //验证不通过,重定向到编辑页面
        //return res.redirect(`/admin/user-edit?message=${error.message}`);
        //JSON.stringify() 将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({ path: 'regist', message: error.message }))
    }
    //根据手机号码查询用户是否存在
    let user = await User.findOne({ tel: req.body.tel });
    if (user) {
        //如果手机号码已被注册
        return next(JSON.stringify({ path: 'regist', message: '该手机号已被注册' }))
    }
    // 对密码进行加密处理 生成随机字符串
    // let salt = await bcrypt.genSalt(10);
    // 密码加密
    // let saltpw = await bcrypt.hash(req.body.password, salt);
    // 密码替换
    // req.body.password = saltpw;
    //将用户信息添加到数据库
    await User.create(req.body);
    //将用户信息存放在locals对象下，使所有模板都能获取此数据
    req.app.locals.userInfo = req.body;
    //将页面重定向到首页
    res.redirect('/home/');
}