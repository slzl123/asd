window.addEventListener('load',function(){
    var login = this.document.querySelector('#login');
    var register = this.document.querySelector('#register');
    var changepsw = this.document.querySelector('#changepsw')
    var loginA = login.querySelector('.a_2');
    var loginA_2 = changepsw.querySelector('a')
    var registerA = register.querySelector('a');
    var changepswA = login.querySelector('.a_1');
    var images_box = this.document.querySelector('.images_box')
    var getVerify = this.document.querySelector('.getVerify');
    login.addEventListener('submit',(e)=>{
        e.preventDefault()
    })
    register.addEventListener('submit',(e)=>{
        e.preventDefault()
    })
    changepsw.addEventListener('submit',(e)=>{
        e.preventDefault()
    })
    loginA.addEventListener('click',function(){
        login.style.display = 'none';
        changepsw.style.display = 'none';
        register.style.display = 'block';
        images_box.style.backgroundImage = 'url(' + '../images/374192679.jpg' + ')';
    })
    registerA.addEventListener('click',function(){
        register.style.display = 'none';
        changepsw.style.display = 'none';
        login.style.display = 'block';
        images_box.style.backgroundImage = 'url(' + '../images/353526201.jpg' + ')';
    })
    changepswA.addEventListener('click',function(){
        login.style.display = 'none';
        register.style.display = 'none';
        changepsw.style.display = 'block';
        console.log(1)
    })
    loginA_2.addEventListener('click',function(){
        login.style.display = 'block';
        register.style.display = 'none';
        changepsw.style.display = 'none';
    })
    var times = 60;
    getVerify.addEventListener('click',function(){
        getVerify.disabled = true;
        var set = setInterval(function(){
            if(times == 0){
                getVerify.disabled = false;
                getVerify.innerHTML = '发送验证码';
                clearInterval(set);
            }else{
                getVerify.innerHTML = '已发送' + '(' + times+ ')';
                times--;
            }
        },1000)
    })

    //本地存储实现登录注册功能
    var login = this.document.querySelector('#login');
    login.addEventListener('submit',function(e){
        var username = this.document.querySelector('#username');
        var password = this.document.querySelector('#password');
        e.preventDefault();

    })
})