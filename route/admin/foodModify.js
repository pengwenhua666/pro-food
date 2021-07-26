const { Food } = require('../../model/food')
//引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
module.exports = (req, res )=>{
    //即将要修改的菜品id
    const fid = req.query.id;
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置上传文件的存放位置 绝对路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //保留上传文件的后缀
    form.keepExtensions = true;
    form.encoding = 'utf-8';
    //解析表单
    form.parse(req, async(err,fileds, files)=>{
       await Food.updateOne({_id: fid}, {
            foodname: fileds.foodname,
            price: fileds.price,
            picture: files.picture.path.split('public')[1],
            content: fileds.content
        });
        res.redirect('/admin/food');
    // res.send(files);
    })
    // res.send('ok');
}