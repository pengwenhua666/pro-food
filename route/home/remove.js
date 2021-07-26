//导入购物车集合构造函数
const { Shopcar } = require('../../model/shopcar');
module.exports = async(req, res) => {
    //接收客户端传过来的参数
    const { uid, fid } = req.query
    //查询用户购物车信息
    // let shopcar = await Shopcar.findOne({uid: uid})
    //根据id删除购物车中的菜品
    await Shopcar.updateOne({uid: uid},{
        $pull: {
            goods: {fid: fid}
        }
    });
    res.redirect('/home/myorder?uid=' + uid);
}