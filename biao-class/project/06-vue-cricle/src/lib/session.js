 
import store from '../lib/store'

let $user;

function login(user,id,redirect="/"){
    $user = user;
    //把用户登录的id存到localstorage里，
    localStorage.setItem('sessionId',id);
    store.set('user',user);
    if(!redirect)
    return;

    location.href=redirect;
}

function logout(){
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    location.href="/";
}

//返回一个user对象， 解析JSON字符串的数据 
function userData(){
    return store.get('user');
}
//是否已经登录
function isLogin(){
    return localStorage.getItem('sessionId');
}
function isAdmin(){
    return userData().IS_ADMIN;
}

export default {
    userData,
    login,
    logout,
    $user,
    isLogin,
    isAdmin,

}