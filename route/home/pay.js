//导入购物车集合构造函数
const { Shopcar, ObjectId } = require('../../model/shopcar');
module.exports = async(req, res) => {
    //接收客户端传过来的参数
    let fids = req.query;
    //获取用户id
    let uid = fids.fid[0];
    //删除数组中的用户id
    //fids.fid.splice(0,1);
    //精确查找
    let shop = await Shopcar.findOne({uid: uid});
    //根据用户id查找购物车并设置已选菜品为已支付
    for(var i = 1; i < fids.fid.length; i++){
        let fIndex = shop.goods.findIndex((value) => (value.fid == fids.fid[i] && value.isPay == false));
        if(fIndex != -1){
            let id = shop.goods[fIndex]._id;
            await Shopcar.updateMany({uid: uid, goods:{$elemMatch:{_id: ObjectId(id)}} },{
                $set:{ 'goods.$.isPay': true }
            })
        }
    }
    res.redirect('/home/');
}