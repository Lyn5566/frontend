window.vali ={

    isUsername,
    isPassword,
    isEmail,
    isPhone,
    betweenLength,
    between,

};

function isUsername(str){
    if(!betweenLength(str,4,12) || str=='SB')
    return false;

    return true;
}

function isPassword(str){
    if(!betweenLength(str,4,12))
        return false;
   
    return true;
}

function isEmail(str){
    if(!str.includes('@'))
    return false;

    return true;
}
function isPhone(str){
    if((str.length!=11&&str.length!=13) || !str.startsWith('1')){
    return false;
    }
    return true;
}

function betweenLength(str,min,max){
    return between(str.length,min,max);
}

function between(num,min,max){
    return  num >= min && num <= max;
}
