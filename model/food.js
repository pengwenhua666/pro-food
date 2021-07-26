const { required } = require('joi/lib/types/lazy');
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodname:{
        type: String,
        minlength: 2,
        maxlength: 20,
        required: [true, '请输入菜品名称']
    },
    price:{
        type: String,
        required: [true, '请输入菜品价格']
    },
    picture:{
        type: String,
        default: null
    },
    content:{
        type: String
    }
});
const Food = mongoose.model('Food', foodSchema);

module.exports = {
    Food
}