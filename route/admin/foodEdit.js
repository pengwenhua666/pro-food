//引入菜品集合构造函数
const { Food } = require('../../model/food')

module.exports= async(req,res)=>{
    //标识，表示当前访问的是菜品管理页面
    req.app.locals.currentLink = 'food';
    //获取当前地址栏中的id
    const { message, id } = req.query;
    //如果当前传递了id
    if(id){
        //修改操作
        let food = await Food.findOne({_id: id})
        //渲染用户修改页面
        res.render('admin/food-edit.art',{
            message: message,
            food: food,
            link: '/admin/foodModify?id=' + id,
            button: '修改'
        })
        // res.send(food);
    }else{
        //添加操作
        res.render('admin/food-edit.art',{
            message: message,
            link: '/admin/foodAdd',
            button: '添加'
        })
    }
}