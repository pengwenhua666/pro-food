const { Food } = require('../../model/food');
module.exports = async(req, res) => {
    //获取id参数并删除菜品
    await Food.findOneAndDelete({ _id: req.query.id });
    //重定向到菜品列表页面
    res.redirect('/admin/food');
}