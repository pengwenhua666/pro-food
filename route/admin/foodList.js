//将菜品集合构造函数导入到当前文件中
const { Food } = require('../../model/food');
//导入mongoose-sex-page数据分页模板
const pagination = require('mongoose-sex-page');
module.exports = async(req,res)=>{
    //接收客户端传递过来的页码
    const page = req.query.page
    //标识，表示当前访问的是菜品管理页面
    req.app.locals.currentLink = 'food';
    //查询所有菜品数据
    let foods = await pagination(Food).find().page(page).size(2).display(3).exec();
    let str = JSON.stringify(foods);
    let json = JSON.parse(str);
    //渲染菜品列表页面
    res.render('admin/food.art', {
        foods:json
    })
}