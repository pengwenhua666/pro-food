module.exports = (req, res, next) => {
    //判断用户是否是访问的登录页面、
    //判断用户的登录状态
    //如果用户已登录，将请求放行
    //如果用户未登录，将请求重定向到登录页面
    //req.url !='/login'  &&
    if (!req.session.username) {
            res.redirect('/admin/login');
    } else {
        if (req.session.role == '普通用户') {
            return res.redirect('/home/');
        }
        //用户处于登录状态，将请求放行
        next();
    }
}

 