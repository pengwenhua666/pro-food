module.exports = (req, res) => {
    //获取当前地址栏中的参数
    const { message } = req.query;
    //渲染注册模板
   if( message ){
    res.render('regist.art',{
        message: message
    });
    //res.send('ok')
   }else{
    //    res.send('null')
    res.render('regist.art');
   } 
}