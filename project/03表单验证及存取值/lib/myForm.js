
//表单插件
;(function(){

    'use strict'

     let form;
    window.myForm = function(selector,onSubmit){
        form = document.querySelector(selector);
        form.addEventListener('submit',e=>{
            e.preventDefault();
            //把拿到的数据回传回去
            onSubmit(getData());
            form.reset();
        });
        return {
            setData,
            getData,
        };

    };
    //存数据 set
    /**
     * 
     * @param {数据} data 
     * @param {表单} form 
     */
    function setData(data){
        for(let key in data){
            let val = data[key];
            let input = form.querySelector(`[name = ${key}]`);
            switch(input.type){
                case 'radio':
                 // 选中类型为"radio"，且name为本项的键，且值为本项值的元素
                 // 以 gender: 'male' 为例（比如说循环到{... gender: 'male', ...}这一项）
                 // radio 就等于 <input type=radio name=gender value=male>

                let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);         
                radio && (radio.checked = true);
                break;
                case 'checkbox':
                // 如果是复选框说明值是数组
                // 以 orientation: ['male', 'female'] 为例（比如说循环到{... orientation: ['male', 'female'], ...}这一项）

                val.forEach(it =>{
                let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);                 
                checkbox && (checkbox.checked=true);
                })
                break;

                default:
                input.value=data[key];

            }

        }
    }

    //取数据 get
    /**
     * 
     * @param {表单} form 
     */
    function getData() {
        let data = {};
        let inputs = form.querySelectorAll('[name]');
        inputs.forEach(it => {
            switch (it.type) {
                case 'number':
                    data[it.name] = parseFloat(it.value);
                    break;

                case 'radio':
                    if (!it.checked)
                        return;
                    data[it.name] = it.value;
                    break;

                case 'checkbox':
                // 第一次碰到复选框，就应该将data中对应的那一项初始化为空数组
                // 否则后面没法推入选中的值
                    if (!Array.isArray(data[it.name]))
                        data[it.name] = [];

                    if (it.checked)
                        data[it.name].push(it.value);

                    break;

                case 'date':
                case 'time':
                case 'week':
                case 'month':
                case 'datetime':
                case 'datetime-local':

                // 就将其转化为更强大的Date对象
                data[it.name] = it.valueAsDate;
                break;
                // 默认情况下直接取字符串
                default:
                    data[it.name] = it.value;

            }

        });
        return data;
    }


})();
    