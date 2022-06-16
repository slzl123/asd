(function(){
    // 定时器，每隔 1 秒执行 1 次
    setInterval(() => {
        //将对象里的内容实例化
        var dt = new Date()
        var YY = dt.getFullYear();
        var MM = dt.getMonth();
        var dd = dt.getDate();
        var HH = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()
        // 为页面上的元素赋值
        document.querySelector('#YY').innerHTML = YY;
        document.querySelector('#MM').innerHTML = MM + 1;
        document.querySelector('#dd').innerHTML = dd;
        document.querySelector('#HH').innerHTML = padZero(HH)
        document.querySelector('#mm').innerHTML = padZero(mm)
        document.querySelector('#ss').innerHTML = padZero(ss)
    }, 1000)
  
    // 补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //请求疫情实时数据
    function dataTime(){
        axios({
            method:'get',
            url:'https://api.tianapi.com/ncov/index?key=c7f81396b4f948250d38eb2da6680167',
            params:{}
        }).then(function(res){
            //确诊人数
            var Diagnosed = res.data.newslist[0].desc.currentConfirmedCount;
            //较昨日
            var Diagnosed_yesyerday = res.data.newslist[0].desc.currentConfirmedIncr;
            // 无症状人数
            var asymptomatic = res.data.newslist[0].desc.seriousCount;
            //较昨日
            var asymptomatic_yesterday = res.data.newslist[0].desc.seriousIncr;
            //累计治愈
            var cure = res.data.newslist[0].desc.curedCount;
            // 较昨日
            var cure_yesterday = res.data.newslist[0].desc.curedIncr;
            //累计死亡人数
            var deadCount = res.data.newslist[0].desc.deadCount;
            //较昨日
            var deadCount_yesterday = res.data.newslist[0].desc.deadIncr;
            document.querySelector('.Diagnosed').innerHTML = Diagnosed;
            document.querySelector('.asymptomatic').innerHTML = asymptomatic;
            document.querySelector('.cure').innerHTML = cure;
            document.querySelector('.deadCount').innerHTML = deadCount;
            document.querySelector('.Diagnosed_yesterday').innerHTML = '+' + Diagnosed_yesyerday;
            document.querySelector('.asymptomatic_yesterday').innerHTML = asymptomatic_yesterday;
            document.querySelector('.cure_yesterday').innerHTML = '+' + cure_yesterday;
            document.querySelector('.deadCount_yesterday').innerHTML = '+' + deadCount_yesterday;
        })
    }
    dataTime()
    //每隔5ms刷新网页
    setInterval(() => {
        dataTime();
    }, 10000);

    // navjs
    var nav = document.querySelector('nav');
    document.onscroll = function(){
        var Y = window.scrollY;
        if(Y > 70){
            nav.style.position = 'fixed';
            nav.style.backgroundColor = '#06133e'   
        }else if(Y < 70){
            nav.style.position = 'absolute'
            nav.style.background = 'none'
        }
    }

    //pe端js
    var more = document.querySelector('#more');
    var nav_right_box = document.querySelector('.nav_right_box')
    var flag = true;
    more.addEventListener('click',function(){
        if(flag){
            nav_right_box.style.height = 'auto';
            nav_right_box.style.display = 'flex'
            flag = false;
        }else if(flag == false){
            nav_right_box.style.height = '0';
            flag = true;
        }
    })
    window.onresize = function(){
        console.log(window.outerWidth)
        nav_right_box.style.display = 'none';
        if(this.outerWidth - 16 > 768){
            nav_right_box.style.display = 'flex';
        }else if(this.outerWidth - 16 < 768){
            nav_right_box.style.display =  'none';
        }
    }

    // swiper
    var mySwiper = new Swiper(".mySwiper", {
        autoplay: {
            
          },
        pagination: {
          el: ".swiper-pagination",
          clickable: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
    mySwiper.el.onmouseover = function(){
        mySwiper.autoplay.stop();
      }
      mySwiper.el.onmouseout = function(){
        mySwiper.autoplay.start();
      }
    // 当切换轮播图时停止播放视频
    var swiper_wrapper = document.querySelector('.swiper-wrapper').querySelectorAll('video');
    var button_left = document.querySelector('.swiper-button-next');
    var button_right = document.querySelector('.swiper-button-prev');
    button_left.addEventListener('click', function(){
        for(var i = 0; i < swiper_wrapper.length; i++){
             swiper_wrapper[i].pause();
        }
    })
    button_right.addEventListener('click', function(){
        for(var i = 0; i < swiper_wrapper.length; i++){
             swiper_wrapper[i].pause();
        }
    })
    //加入志愿者
    var inputPhone = document.querySelector('#inputPhone');
    var btnPhone = document.querySelector('#btnPhone');
    btnPhone.addEventListener('click',function(){
        if(inputPhone.value == ''){
            alert('请输入您的电话号码！')
        }else{
            alert('欢迎加入志愿者！稍后将会有工作人员联系您。')
        }
    })
    // 图片切换js
    var prevention_body_img = document.querySelector('.prevention_img');
    var prevention_ul = document.querySelector('.prevention_ul'). querySelectorAll('li');
    var prevention_body_img_url = ['./images/防护_img/洗手.webp','./images/防护_img/握手.webp','./images/防护_img/居家隔离.webp','./images/防护_img/洗脸.gif','./images/防护_img/戴口罩.webp','./images/防护_img/远离人群.webp'];
    for(var i = 0; i < prevention_ul.length; i++){
        //给标签添加自定义属性
        prevention_ul[i].setAttribute('index',i);
        prevention_ul[i].addEventListener('mouseover',function(){
            var index = this.getAttribute('index');
            prevention_body_img.style.backgroundImage = 'url(' + prevention_body_img_url[index] + ')'
        })
    } 

    //返回顶部
    var returnTop = document.querySelector('#returnTop');
    document.addEventListener('scroll',function(){
        var pageY = window.pageYOffset;
        console.log(pageY)
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
            console.log((target - window.pageYOffset) / 10);
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
})()