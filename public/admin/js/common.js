//将serializeArray返回值数组转换成对象形式
function serializeToJson(form) {
    var result = {};
    //serializeArray()获取表单中用户输入的内容，jquery特有，返回一个数组
    //[{name:'email',value:'用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item) {
        //result.email
        result[item.name] = item.value;
    });
    return result;
}