//创建用户集合
//导入bcrypt模块
//const bcrypt = require('bcrypt');
//引入第三方模块mongoose
const mongoose = require('mongoose');
//导入Joi模块，验证格式
const Joi = require('joi')
//创建用户规则集合
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    tel: {
        type: String,
        //保证手机号码在插入数据库时不重复
        //unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

//创建用户
async function createUser() {
    // let salt = await bcrypt.genSalt(10);
    // let pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'pengwenhua',
        tel: '13551625948',
        password: '123456',
        role: '管理员'
    })
}
//createUser();

//验证用户信息
const validateUser = (user) => {
    //获取传递过来的参数  req.body
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(6).max(18).required().error(new Error('用户名不符合规则')),
        tel: Joi.string().regex(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).required().error(new Error('手机号码格式不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不正确')),
        role: Joi.string().valid('管理员', '普通用户').required().error(new Error('角色不存在'))
    };
    //实施验证
    return Joi.validate(user, schema);
};

//将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
};