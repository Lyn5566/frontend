
function set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

function get(key){
    let json = localStorage.getItem(key);
    if(!json)
    return;
    
    return JSON.parse(json);
}

export default {
    set,
    get,
}