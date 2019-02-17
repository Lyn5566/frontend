
const parent = document.querySelector('.slider');

const items = parent.querySelectorAll('.item');

let current = 0;
let lastIndex = items.length-1;

boot();

function boot(){

    setInterval(() => {
        
        getShow(items[0]);
        ++current;
        if(current >=items.length){
            current=0;
        }
         
        let prev = getPrev(current);
        let next = items[current];
        if(prev)
        getHide(prev);
        getShow(next);
    }, 1000);
}
function getPrev(ele){
    if(ele==0){
        return items[lastIndex];
    }else{
        return items[ele-1];
    }
}
function getHide(el){
    if(!el)
    return;
    el.style.opacity=0;
}
function getShow(el){
    if(!el)
    return ;    
    el.style.opacity=1;
}

