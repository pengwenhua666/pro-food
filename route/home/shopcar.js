//导入购物车集合构造函数
const { Shopcar, ObjectId } = require('../../model/shopcar');
//导入菜品集合构造函数
const { Food } = require('../../model/food');

module.exports = async(req, res) => {
    //接收客户端传递过来的参数
    const { uid, fid, sign } = req.query
    //查询菜品
    let food = await Food.findOne({_id: fid});
    //查询购物车集合表中是否有该用户id
    let isuid = await Shopcar.findOne({uid: uid});
    if(isuid){
        //查询是否已点该菜品
        //let isfood = isuid.goods.some(function(item, index){return item.fid == fid});
        let fIndex = isuid.goods.findIndex((value) => value.fid == fid); //返回满足条件的数组下标，查不到则返回-1
        if((fIndex != -1) && (isuid.goods[fIndex].isPay == false)){
            //已点 
            let fnum = isuid.goods[fIndex].fnum;
            let totalPrice = isuid.goods[fIndex].totalPrice;
            let id = isuid.goods[fIndex]._id;
            if(sign == 0){
                await Shopcar.updateOne({uid: uid,goods:{ $elemMatch:{_id: ObjectId(id)}}},
                  {//减少点菜数量及该菜品总价
                      $set:{'goods.$.fnum': fnum - 1,'goods.$.totalPrice': totalPrice - (food.price - 0)}
                  });
            }else{
                await Shopcar.updateOne({uid: uid,goods:{ $elemMatch:{_id: ObjectId(id)}}},
                  {//增加
                      $set:{'goods.$.fnum': fnum - 0 + 1,'goods.$.totalPrice': (totalPrice - 0) + (food.price - 0)}
                  });
            }
        }else{
            //未点
            await Shopcar.updateOne({uid: uid},{
                $push:{
                    goods:{
                        fid: fid,
                        price: food.price,
                        fnum: 1,
                        totalPrice: food.price,
                        isPay: false
                    }
                }
            })
        }
    }else{
        //将用户数据添加进数据库
        await Shopcar.create({
            uid: uid,
            goods:[{
                fid: fid,
                price: food.price,
                fnum: 1,
                totalPrice: food.price,
                isPay: false
            }],
        })
    }
    if(sign){
        //重定向到我的购物车页面
        res.redirect('/home/myorder?id=' + uid);
    }
    //重定向到首页
    res.redirect('/home/');
    //res.send(req.query);
}