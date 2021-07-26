const { Shopcar } = require('../../model/shopcar');

module.exports = async(req, res)=>{
    //标识，表示当前访问的是订单页面
    req.app.locals.currentLink = 'myorder';
    //接收客户端传递过来的id
    let uid = req.query.id;
    //查询用户的购物车 
    let shopcar =  await Shopcar.findOne({uid: uid}).populate('goods.fid','picture foodname').exec();
    if(shopcar){
        //过滤已支付的菜品
        let toPayArr = shopcar.goods.filter((item, index) => { return item.isPay == true });
        let str = JSON.stringify(toPayArr);
        let json = JSON.parse(str)
        //渲染菜品点餐首页并传递数据
        res.render('home/mycar.art',{
            toPayArr: json
        });
    }else{
        res.send('没有订单哟');
    }
}