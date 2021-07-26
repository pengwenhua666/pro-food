//引入mongoose模块
const mongoose = require('mongoose');
//创建评论集合规则
const commentSchema = new mongoose.Schema({
    //菜品id
    fid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    //评论人id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //评论时间
    time: {
        type: Date
    },
    //评论内容
    content: {
        type: String
    }
});
//创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

//将评论集合构造函数作为模块成员进行导出
module.exports = {
    Comment
}