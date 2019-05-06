
//表单插件
;(function(){

    'use strict'

     let form;
    window.myForm = function(selector,onSubmit){
        form = document.querySelector(selector);
        form.addEventListener('submit',e =>{
            e.preventDefault();

            onSubmit(getData());
            form.reset();
        })
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
                let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);
                
                radio && (radio.checked = true);
                break;
                case 'checkbox':
                val.forEach(it =>{
                let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);
                   
                checkbox && (checkbox.checked=true);
                })
                break;

                default:
                input.value = data[key];

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
                    if (!Array.isArray(data[it.name]))
                        data[it.name] = [];

                    if (it.checked)
                        data[it.name].push(it.value);

                    break;

                case 'date':
                data[it.name] = it.valueAsDate;
                break;

                default:
                    data[it.name] = it.value;

            }

        });
        return data;
    }


})();
    