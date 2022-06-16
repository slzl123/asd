window.onload = function(){
    //pe端js
    var more = document.querySelector('#more');
    var nav_right_box = document.querySelector('.nav_right_box')
    var flag = true;
    more.addEventListener('click',function(){
        if(flag){
            nav_right_box.style.display = 'flex';
            flag = false;
        }else if(flag == false){
            nav_right_box.style.display = 'none';
            flag = true;
        }
    })

    window.onresize = function(){
        nav_right_box.style.display = 'none';
        if(this.outerWidth > 786){
            nav_right_box.style.display = 'flex';
        }else if(this.outerWidth < 768){
            nav_right_box.style.display =  'none';
        }
    }

    var nav = document.querySelector('nav');
    document.onscroll = function(){
        var Y = window.scrollY;
        if(Y > 70){
            nav.style.position = 'fixed';
            nav.style.backgroundColor = '#06133e'   
        }else if(Y < 70){
            nav.style.position = 'absolute'
            nav.style.backgroundColor = '#06133e'
        }
    }

    //返回顶部
    var returnTop = document.querySelector('#returnTop');
    document.addEventListener('scroll',function(){
        var pageY = window.pageYOffset;
        if(pageY < 780){
            returnTop.style.display = 'none';
        }else{
            returnTop.style.display = 'block';
        }
    })
    returnTop.addEventListener('click',function(){
        animate(window,0);
    })

    //被封装的animate动画
    function animate(obj,target,callback){
        //定时器开始前先清除一遍定时器然后再执行目的是让定时器触发一次的时候只会执行完一次后，在触发在执行不会连续执行。
        clearInterval(obj.timer);
        //这里的obj.timer给不同的元素指定了定时器
        obj.timer = setInterval(function() {
            //动画缓动算法：(目标值 - 现在的值) / 10 作为每次移动的距离步长 因为是除法所有有余数这时需要取整
            //
            var step = (target - window.pageYOffset) / 10;
            //三元运算符简写取整操:作如果step大于0则返回Math.ceil(step)向上取整 否则返回Math.floor(step)向下取整
            //点击按钮的时候，判断步长是正值还是负值
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(window.pageYOffset == target){
                clearInterval(obj.timer);
                //在定时器结束的位置写回调函数
            }
            console.log(window.pageYOffset);
            window.scroll(0,window.pageYOffset + step);
        },10)
        //判断第三个参数是否存在存在则返回true，然后执行函数
        callback && callback();
    }
}