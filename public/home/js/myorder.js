$(function(){
    //勾选菜品
    $('.checkbox').click(function(){
        if($(this).is(':checked')){
            totalMoney();
        }else{
            totalMoney();
        }
    });

    //商品数量禁止小于1
    $('#reduce').each(function () {
        if($('.num').val() == 1){
            $(this).attr('disabled',true)
            $(this).attr('href','javascript:;')
            alert('最少一份菜品哟')
        }
    });

    //支付
    $('.calBtn').click(function(){
        var parms = [];
        parms.push($('.uid').val());
        $('.checkbox').each(function(){
            if($(this).is(':checked')){
                // var fids = $(this).siblings('.fid').val();
                // alert(fids);
                parms.push($(this).siblings('.fid').val());
            }
        });
        $.ajax({
                type: "get",
                url: "http://localhost:8080/home/pay",
                contentType: "application/json; charset=utf-8",
                data: {"fid": parms},
                traditional: true,
                dataType: "json"
            });
            alert('支付成功,祝您用餐愉快！');
            location.reload();
});

    //菜品总价
    function totalMoney(){
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $('.checkbox').each(function(){
            if($(this).is(':checked')){
                var goods = parseInt($(this).parent('.bottom').siblings('.content').find('.totalPrice').html());
                var num =  parseInt($(this).parent('.bottom').siblings('.content').find('.num').val());
                // console.log(num)
                total_money += goods;
                total_count += num;
                // alert('ok');
            }
        });
        $('.total_text').html('￥'+total_money);
        $('.piece_num').html(total_count);
        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
          }
        }
});