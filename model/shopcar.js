//引入mongoose模块
const mongoose = require('mongoose');
//创建购物车集合规则
const shopcarSchema = new mongoose.Schema({
    uid:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    goods:[{
        fid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        },
        price: {
              type: String
        },
        fnum: {
            type: String,
            default: 1
        },
        totalPrice: {
            type: String
        },
        isPay: {
            type: Boolean,
            default: false
        }
    }]
});
//创建购物车规则集合
const Shopcar = mongoose.model('Shopcar', shopcarSchema);
const ObjectId = mongoose.mongo.ObjectID

module.exports = {
    Shopcar,
    ObjectId
}