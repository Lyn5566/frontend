window.myPopup={
        boot,
}


let trigger, popup, mask, config, keys;

//可配置文件    
const defaultConfig = {
    position: 'center',
    offsetX: 0,
    offsetY: 0
}

//一切从这里开始

// boot('#trigger', '#popup', {
//     //用户配置
//     position: 'center',
//     keyToHide: 'a',
//     offsetX: 100,
//     offsetY: 100

// });
//custom默认是一个空对象
function boot(triggerSelector, popupSelector, custom = {}) {

    trigger = document.querySelector(triggerSelector);
    popup = document.querySelector(popupSelector);

    initPopup();
    initMask();
    bindOpen();
    bindClose();
    loadConfig(custom);

}
//将默认设置和个人用户设置存放起来，成为全局变量通篇使用
function loadConfig(custom) {
    config = Object.assign({}, defaultConfig, custom)
}

function initPopup() {
    popup.hidden = true;
    popup.classList.add('my-popup');
}

function initMask() {
    mask = document.createElement('div');
    mask.classList.add('my-mask');
    mask.hidden = true;
    document.body.appendChild(mask);

}
//是否显示
function setVisible(show = false) {
    popup.hidden = mask.hidden = !show;
}

function bindOpen() {
    trigger.addEventListener('click', () => {
        setVisible(true);
        reposition(config.position, config.offsetX, config.offsetY);
        bindBtn();

    })
}

function bindClose() {
    mask.addEventListener('click', () => {
        setVisible(false);
    })


    window.addEventListener('keyup', (e) => {
        if (config.keyToHide === e.key) {
            setVisible(false);
        }
    })
}

function bindBtn() {

    popup.addEventListener('click', e => {
        console.log(e.target);
        reposition(e.target.id);
    })

}


function reposition(position = 'center', xOffset = 0, yOffset = 0) {

    //获取window的尺寸
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    //popup的尺寸
    let popupWidth = popup.offsetWidth;
    let popupHeight = popup.offsetHeight;
    let target = popup.style;

    switch (position) {
        case 'center':

            target.left = windowWidth / 2 - popupWidth / 2 + xOffset + 'px';
            target.top = windowHeight / 2 - popupHeight / 2 + yOffset + 'px';
            break;

        case 'top-left':
            target.left = xOffset + 'px';
            target.top = yOffset + 'px';
            break;

        case 'top-center':
            target.left = windowWidth / 2 - popupWidth / 2 + xOffset + 'px';
            target.top = yOffset + 'px';
            break;
        case 'top-right':
            target.left = windowWidth - popupWidth + xOffset + 'px';
            target.top = yOffset + 'px';
            break;
        case 'left-center':
            target.left = xOffset + 'px';
            target.top = windowHeight / 2 - popupHeight / 2 + yOffset + 'px';
            break;
        case 'right-center':
            target.left = windowWidth - popupWidth + xOffset + 'px';
            target.top = windowHeight / 2 - popupHeight / 2 + yOffset + 'px';
            break;
        case 'bottom-left':
            target.left = xOffset + 'px';
            target.top = windowHeight - popupHeight + yOffset + 'px';
            break;
        case 'bottom-center':
            target.left = windowWidth / 2 - popupWidth / 2 + xOffset + 'px';
            target.top = windowHeight - popupHeight + yOffset + 'px';
            break;
        case 'bottom-right':
            target.left = windowWidth - popupWidth + xOffset + 'px';
            target.top = windowHeight - popupHeight + yOffset + 'px';
            break;
    }

}
