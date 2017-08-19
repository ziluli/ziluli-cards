/**
 * Created by dell on 2017/5/26.
 */
$(function () {
    // 52张  花色 数字
    let poke = [];
    let biao = {};    //记录发过的扑克牌
    //[{花色：'h'  红星   ,数字:5},{花色:'s'  黑桃   ,'8'}  方块c  梅花d ]
    // h_5 :true  s_5:true
    let color = ['h', 's', 'c', 'd'];
    let moveR = $('.moveR');
    let moveL = $('.moveL');
    // let dir={
    //     '1':'A',
    //     '2':'2',
    //     '3':'3',
    //     '4':'4',
    //     '5':'5',
    //     '6':'6',
    //     '7':'7',
    //     '8':'8',
    //     '9':'9',
    //     '10':'10',
    //     '11':'J',
    //     '12':'Q',
    //     '13':'K'
    // }
    for (let i = 0; i < 52; i++) {
        let huase = color[Math.floor(Math.random() * 4)];
        let shuzi = Math.floor(Math.random() * 13 + 1);
        while (biao[huase + '_' + shuzi]) {    //去重
            huase = color[Math.floor(Math.random() * 4)];
            shuzi = Math.floor(Math.random() * 13 + 1);
        }
        biao[huase + '_' + shuzi] = true;
        poke.push({huase, shuzi});
    }
    let index = 0;   //记录当前发的是第几张扑克牌
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < i; j++) {
            let item = poke[index];
            // item={huase:'s',shuzi:5};
            index++;
            // let src="url(img/"+dir[item.shuzi]+item.huase+'.png)'; //找到图片
            let src='url(img/'+item.huase+item.shuzi+'.png)';
            $('<div>').addClass('poke')
                .css('background',src)
                .css('background-size','cover')
                // .html(`${item.huase}---${item.shuzi}`)
                .prop('id', i + '_' + j)    //第几行 第几张
                .delay(30 * index)
                .data('num', item.shuzi)
                .animate({
                    left: 300 - i * 50 + 100 * j + 50,
                    top: 50 * i
                    // opacity: 0.8
                })
                .appendTo('.table');
        }
    }
    for (; index < poke.length; index++) {
        let item = poke[index];
        // let src="url(img/"+dir[item.shuzi]+item.huase+'.png)'; //找到图片
        let src='url(img/'+item.huase+item.shuzi+'.png)';
        $('<div>').addClass('poke zuo')
            .css('background',src)
            // .html(`${item.huase}---${item.shuzi}`)
            .data('num', item.shuzi)
            .css('background-size','cover')
            .delay(30 * index)
            .animate({
                left: 50,
                top: 500
                // opacity: 0.8
            })
            .appendTo('.table');
    }

    let first = null;
    $('.poke').click(function () {
        let ids = $(this).prop('id').split('_');//字符串  拆分 成'1','1'
        //1_1
        // parseInt(ids[0])+1,ids[1]
        // parseInt(ids[0])+1,parseInt(ids[1]+1);  找到所对应的元素，转换成ID
        let ele = $(`#${parseInt(ids[0]) + 1}_${parseInt(ids[1] + 1)}`);
        let ele1 = $(`#${parseInt(ids[0]) + 1}_${parseInt(ids[1])}`);
        console.log(ele);
        // ele是一个打包好的集合  返回是空对象
        if (ele.length == 1 || ele1.length == 1) {
            return;
        }
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).animate({top: '-=20'})
        } else {
            $(this).animate({top: '+=20'})
        }


        if (!first) {
            first = this;
            let sum = $(first).data('num');
            if (sum == 13) {
                $('.active').animate({top: 0, left: 600}, function () {
                    $(this).remove();
                })
                first = null;
            }

        } else {
            //和为13
            let sum = $(first).data('num') + $(this).data('num');
            if (sum == 13) {
                // $('.active').animate({top: 0, left: 600},function(){
                //     $(this).remove();
                // })
                $('.active').animate({left: 600, top: 0}).queue(function () {
                    $(this).remove();
                })
            } else {
                $('.active').removeClass('active')
                    .animate({top: `+=20`})

            }
            first = null;
        }
    })

    let z = 1;
    moveR.on('click', function () {
        z++;
        $('.zuo:last')
            .animate({left: '+=500'})
            .removeClass('zuo')
            .css('zIndex', z)
            .addClass('you')
    })
    moveL.on('click', function () {
        let you = $('.you');
        if (you.length == 0) {
            return;
        }
        ;
        for (let i = you.length - 1; i >= 0; i--) {
            $(you[i]).delay(200 * i)
                .animate({left: '-=500'}, function () {
                    $(this).css('zIndex', 0)
                })
                .addClass('zuo')
                .removeClass('you')
        }
    })


})
