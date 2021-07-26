const { Shopcar } = require('../../model/shopcar');

module.exports = async(req, res)=>{
    //标识，表示当前访问的是购物车页面
    req.app.locals.currentLink = 'mycar';
    //接收客户端传递过来的id
    let uid = req.query.id;
    //查询用户的购物车 
    let shopcar =  await Shopcar.findOne({uid: uid}).populate('goods.fid','picture foodname').exec();
    // let foods = await Food.find();
    if(shopcar){
        //过滤未支付的菜品
        let toPayArr = shopcar.goods.filter((item, index) => { return item.isPay == false });
        let str = JSON.stringify(toPayArr);
        let json = JSON.parse(str)
        //渲染菜品点餐首页并传递数据
        res.render('home/myorder.art',{
            toPayArr: json
        });
    }else{
        res.send('购物车内空空如也，请先点餐....');
    }
}