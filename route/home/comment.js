const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接收客户端传递过来的请求参数
    const { content, uid, fid } = req.body;
    //将评论信息存储到数据库中
    await Comment.create({
        content: content,
        uid: uid,
        fid: fid,
        time: new Date()
    });
    //重定向页面
    res.redirect('/home/food?id=' + fid);
    // res.send('ok');
}