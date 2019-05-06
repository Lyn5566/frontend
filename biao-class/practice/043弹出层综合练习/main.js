
let trigger,popup;

    boot('#trigger','#popup');

function boot(triggerSelector,popupSelector){

    trigger = document.querySelector(triggerSelector);
    popup = document.querySelector(popupSelector);

    popup.hidden = true; 
    //添加自己的插件类
    popup.classList.add('my-popup');
    console.log(popup);
    //造一个遮罩
    let mask = document.createElement('div');

    mask.classList.add('my-mask');

    document.body.appendChild(mask);

    console.log(mask);

    trigger.addEventListener('click',() =>{

     popup.hidden =false;
    });
}