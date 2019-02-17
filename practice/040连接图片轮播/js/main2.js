// 图片轮播练习
const slides = document.querySelector('.slider');
const items = slides.querySelectorAll('.item');

let current = 0;

let lastIndex = items.length-1;

boot();

function boot(){
    startWith();
}

function startWith(){
    show(items[0]);
    setInterval(() => {
        flip();
        
    }, 1000);
}
function flip(){
    
    ++current;
    if(current >=items.length){
        current = 0;
    }
    let prevEl = getPrev();
    let currEl = items[current];
    if(prevEl)
    hide(prevEl);
    show(currEl);
}

function show(el){
    if(!el)
    return ;
    el.style.opacity=1;
}

function hide(el){
    if(!el)
    return;
    el.style.opacity=0;
}

function getPrev(){
    if(current==0){
        return items[lastIndex];
    }else{
        return items[current-1];
    }
}

