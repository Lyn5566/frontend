let slides = document.querySelector('.slider');
let items = slides.querySelectorAll('.item');
let currentIndex = 0;
let lastIndex = items.length - 1;

let config = {model:'slide',interval:1000};


let custom = {
    model:'fade'
}

boot(custom);

function boot(patten) {
//确保第一次就滚动一次
config = Object.assign({},config,patten);
if(config.model == 'slide'){
    slide();
}else{
    hiddenAll();
    fade();
}
    setInterval(() => {
        increment();
      if(config.model=='slide')  {

          slideX();
          slideZ();
        }
        else
        fade();
    }, config.interval);
}
function slide(){
    slideX();
    slideZ();
}
function hiddenAll(){
    
    items.forEach(el =>{
        el.style.opacity = 0;
    })
}

function fade(){
    let prev = getPrev();
    let curr = getCurrent();
    let next = getNext();
    prev.style.opacity = 0;
    curr.style.opacity = 1;
}
//图片index自动增长
function increment(){
    if(currentIndex<lastIndex){
        currentIndex++;
    }else{
        currentIndex=0;
    }
}

//当前元素向左移，在X轴移动
function slideX() {
    let prev = getPrev();
    let curr = getCurrent();
    let next = getNext();

    prev.style.left = -prev.offsetWidth + 'px';
    curr.style.left = 0;
    next.style.left = next.offsetWidth + 'px';
}
    //显示时的覆盖优先度 值越大，在最上面
function slideZ(){
    let prev = getPrev();
    let curr = getCurrent();
    let next = getNext();

    prev.style.zIndex = 1;
    curr.style.zIndex = 2;
    next.style.zIndex = 0;

}

function getPrev() {
    if (currentIndex > 0) {
        return items[currentIndex - 1];
    } else {
        return items[lastIndex];
    }
}

function getCurrent() {
    return items[currentIndex];
}

function getNext() {
    if (currentIndex < lastIndex) {
        return items[currentIndex + 1]
    } else {
        return items[0];
    }
}