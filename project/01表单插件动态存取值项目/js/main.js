;(function(){

    'use strict'
    let struct ={
        username:'用户名',
        email:'邮箱',
        balance:'余额',
    };
    let list =[
        {username:'aaa',
        email:'aaa123@qq.com',
        balance:'123'},
        {username:'bbb',
        email:'bbb123@qq.com',
        balance:'234'},
        {username:'ccc',
        email:'ccc123@qq.com',
        balance:'567'},
    ];
    let action = {
        change(){
            
        }
    };

    let table =  myTable('#userTable',struct,list,action);
    

})();