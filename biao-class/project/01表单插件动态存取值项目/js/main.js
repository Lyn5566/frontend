;(function(){

    'use strict'

    let mf;
    let mt;
    let form = document.querySelector('#userForm');
    let struct ={
        username:'用户名',
        email:'邮箱',
        balance:'余额',
    };
    //填充表格的数据
    let list =[
        {username:'aaa',
        email:'aaa123@qq.com',
        balance:'123'},
        {username:'bbb',
        email:'bbb123@qq.com',
        balance:'234'},
        {username:'ccc',
        email:'ccc123@qq.com',
        balance:'567'},
    ];
  
    
    boot();
    function boot(){
        parseForm();
        parseTable();


    }
    function parseForm(){

         mf = myForm('#userForm',onSubmit);
    }
    function parseTable(){

        let action = {
            Delete(tr,i){
                tr.remove();
                list[i] = null;
                
            },
            Update(tr,i){
                
                mf.setData(list[i]);
                form.querySelector('[name=index]') .value= i;
                
            }
        };
        mt =  myTable('#userTable',struct,list,action);
    }
    
       function onSubmit(formData){
        
           if(!formData.index && formData.index !==0)
           //新规
          list.push(formData);
          else
          //更新
          list[formData.index] = formData;
          mt.render();
      }
    

})();