;(function(){
    'use strict';

    window.myAlert = myAlert;
    let container;
    const defaultConfig = {
        
        type:'info',
        timeout:'3000',
        containerClass:'my-container-class',
        clickItemClose :true,
        
    }

    function myAlert(title,config){
        //合并设置
    config = {...defaultConfig,...config,title};

     prepareEve(config);
     render(config);
     show(config);

     if(config.clickItemClose)
        clickToClose(config);
    }

    //准备环境

    function prepareEve(config){

        container = getContainer(config);
        //如果已经存在，就返回
        if(getContainer(config))
           return;
        //否则就创建一个新容器
        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);

    }

    //获取容器
    function getContainer(config){

        return document.querySelector('.'+config.containerClass);
    }

    function render(config){
        let item = document.createElement('div');
        item.classList.add('my-alert');
        item.classList.add(config.type);
        item.innerHTML = `
        <div class="inner">
        <div class="title">${config.title}</div>
        ${config.desc ? `<div class="desc">${config.desc}</div>`:''}
    </div>
        `;
        config.item = item;
    }
    function show(config){
        container.appendChild(config.item);
        setTimeout($ =>{
            close(config);
        },config.timeout);
        
    }
    
    function close(config){
        config.item.remove();

    }
    function clickToClose(config){
        config.item.addEventListener('click',e =>{
            close(config);
        })
    }

})();