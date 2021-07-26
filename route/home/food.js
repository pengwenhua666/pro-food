//导入菜品集合构造函数
const { Food } = require('../../model/food');
//导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res)=>{
    //接收客户端传递过来的参数id
    const id = req.query.id;
    //根据id查询菜品详细信息
    let food = await Food.findOne({_id: id});
    //查询当前菜品的评论信息
    let comments = await Comment.find({fid: id}).populate('uid');
    let str = JSON.stringify(comments);
    let json = JSON.parse(str);
    //渲染菜品详情页面
    res.render('home/food.art',{
        food: food,
        comments: json
    })
}