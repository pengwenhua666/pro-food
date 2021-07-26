const { Food } = require('../../model/food');

//导入数据分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res)=>{
    //标识，表示当前访问的是首页
    req.app.locals.currentLink = 'index';
    //接收客户端传递过来的页数
    const page = req.query.page || 1;
    //查询所有菜品 
    let result =  await pagination(Food).page(page).size(4).display(3).find().exec();
    let str = JSON.stringify(result);
    let json = JSON.parse(str)
    //渲染菜品点餐首页并传递数据
    res.render('home/default.art',{
        result:json
    });
    // res.send(json);
}