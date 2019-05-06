
;(function(){
'use strict'

let defaultConfig = {

};

window.myDropdown = {

    boot,
}


function boot(selector,list,config){

    let container = document.querySelector(selector);
    //缓存到container
    container.$list = list;
    config = Object.assign({},defaultConfig,config);
    
    prepareDropdown(container);
    setListVisible(container,false);
    render(container,list,config);
    bindFocus(container,config);
    bindClick(container);
    bindSubmit(container,config);
    bindSearch(container,config);
    

}

function prepareDropdown(container){

    container.innerHTML = `
        <div class ="dropdown">
            <div class="filter">
                <input type="search">
            </div>
            <div class="list">
            </div>
        </div>
 
    `;

    container._list = container.querySelector('.list');
    container._input = container.querySelector('[type=search]');

}

function render(container,list,config){
    
    let listData= container._list;
   
    listData.innerHTML = '';
    list.forEach(it => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerText = it[config.display];
        //存到item里，方便以后用
        item.$data = it;
        listData.appendChild(item);
    });

}
function bindSubmit(container,config){
    let onSelect = config.onSelect;
    container._list.addEventListener('click',e =>{
        let input = container._input;
        let it = e.target.$data;
        input.value = it[config.display];
        setListVisible(container,false);
        if(onSelect instanceof Function)
        onSelect(it);


    })
}
function bindSearch(container,config){
    let input = container._input;
    input.addEventListener('keyup',()=>{

        setListVisible(container,true);

        let keyword = input.value;

       let filtered =  container.$list.filter(it =>{
            
            return it[config.display].includes(keyword);
        })
        render(container,filtered,config);
       

    })
}
function bindFocus(container,config){
container._input.addEventListener('focus',e =>{
    setListVisible(container,true);
})

}
//list是否可见

function setListVisible(container,visible = false){

    container._list.hidden = !visible;
}
function bindClick(container){
    container.addEventListener('click',e =>{
        if(e.target.closest('.dropdown'))
        return ;

        setListVisible(container,false);
    })
}

})();

