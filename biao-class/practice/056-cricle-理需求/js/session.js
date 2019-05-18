
window.$user = null;
window.logout = logout;

boot();

//从localstorage里查询出相应的令牌，有的话就加载页面，页面渲染
function boot() {
    if (isLoggedIn()) 
        load();
    
    else
        render();
}

function isLoggedIn() {
    return localStorage.getItem('session');
}

function load(){
    let param = {
        where:{
            and:{
                id:isLoggedIn()}},only:['id','username','nickname'],
        };
    api('user/first',param,
    r =>{
        if(!r.data)
        return;

        $user = r.data;
        console.log($user);
        render();
    })
}
function logout(){
    localStorage.removeItem('session');
    location.reload();
}


function render(){
    if($user){
        loginName.innerText = $user.name || $user.username;
        logAndReg.hidden    = !(inAndOut.hidden = false);
    }else{
        logAndReg.hidden    = true;
        inAndOut.hidden = false;
    }
}
