;(function(){
    'use strict';
    class Alert{

        constructor(title,{desc,type='info',timeout=3000,containerClass='my-container-class',onClick,onClose,onOpen}={}){
            this.title = title;
            this.desc = desc;
            this.type = type;
            this.timeout = timeout;
            this.containerClass = containerClass;
            this.onClick = onClick;
            this.onClose = onClose;
            this.onOpen = onOpen;   
            this.prepareEve();
            this.render();
            this.open();
            this.bindClick();

            this.container = null;

        }

        //准备环境
         prepareEve(){

            this.container = this.getContainer();
            //如果已经存在，就返回
            if(this.getContainer())
               return;
            //否则就创建一个新容器
            let container = this.container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);
    
        }
         getContainer(){

            return document.querySelector('.'+this.containerClass);
        }
         render(){
            let item = document.createElement('div');
            item.classList.add('my-alert');
            item.classList.add(this.type);
            item.innerHTML = `
            <div class="inner">
            <div class="title">${this.title}</div>
            ${this.desc ? `<div class="desc">${this.desc}</div>`:''}
        </div>
            `;
            //存到this里
            this.item = item;
        }
        close(){
            this.onClose && this.onClose(this);
           this.item.remove();
   
       }
         open(){
             this.onOpen && this.onOpen();

            this.container.appendChild(this.item);
            //如果没有时间期限，就一直显示。

            if(!this.timeout)
            return;
            //否则就按定时器显示
            setTimeout($ =>{
                this.close(this);

            },this.timeout);
            
        }
         clickToClose(){
            this.item.addEventListener('click',e =>{
                this.close(this);
            })
        }
        bindClick(){
            this.item.addEventListener('click',e =>{
                if(this.clickToClose)
                this.close(this);
                //如果有回调
                this.onClick && this.onClick(this);
            })
        }

    }




    window.Alert = Alert;
})();