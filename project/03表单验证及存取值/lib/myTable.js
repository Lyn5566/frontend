//myTable插件      

; (function () {

    'use strict';

    window.myTable =function(...args){

        boot(...args);
        return {render};
    };

    let table, thead, tbody, structure, list, operations;

    function boot(tableSelector, struct, arr, oprs) {
          /**
          * 启动
          * @param {string} tableSelector 对应表格的选择器
          * @param {Object} struct 应该显示哪些列
          * @param {Array} list 显示的数据
          * @param {Object} ops 个性按钮及行为
          */
        table = document.querySelector(tableSelector);
        thead = table.tHead;
        tbody = table.tBodies[0];
        structure = struct;
        list = arr;
        operations = oprs;
        render();
    }

    function render() {
        renderHead();
        renderBody();
    }

    function renderHead() {
        thead.innerHTML = '';
        let html = '';
      // 以 name:'姓名' 为例
      // 此时key为'name'
      // 意味着structure[key]为'姓名'
      // 意味着最后生成的字符串为'<th>姓名</th>'
        for (let key in structure) {
            html += `<th>${structure[key]}</th>`;
        }
        if (operations) {
            html += `<th>操作</th>`;
        }

        thead.innerHTML = html;
    }
     /**
     * 渲染tbody
     *
     * 使用list渲染tbody（通过structure来限制渲染的数量和属性）
     */
    function renderBody() {
        tbody.innerHTML = '';
        // 循环每一条数据
        // 以用户列表为例 [{王花花...}, {李拴蛋...}]
        // 此时循环的就是每一个用户
        list.forEach((it, i) => {
            let tr = document.createElement('tr');
            let html = '';
            for (let key in structure) {
                html += `<td>${it[key] || '-'}</td>`;
            }
            if (operations) {
                let btnHtml = '';
                for (let action in operations) {
                    //类名也是对应的key

                    btnHtml += `<button class="${action}">${action}</button>`;
                }
                html += `<td>${btnHtml}</td>`;
            }
            tr.innerHTML = html;
            //每个按钮添加功能
            if (operations) {

                for (let key in operations) {
                    //找到对应按钮的类名绑定点击事件
                    // 以 Delete:function(){...} 为例
                    tr.querySelector('.' + key).// 现通过类名选中按钮，其类名为'.Delete'
                        addEventListener('click', () => {
              // 此处的operations[key]就是function(){...}函数本身
              // 后面的小括号触发了函数，并将其所在行和对应的数据索引回传回去
                            operations[key](tr,i);
                            
                        });                    
                }
            }
            tbody.appendChild(tr);


        })
    }

})();

// let orderStruct = {
//     oid: '订单号',
//     product: '商品',
//     totalCost: '总费用',
// };

// let orders = [
//     {
//         oid: '001',
//         product: '拖鞋',
//         totalCost: 70,
//     },
//     {
//         oid: '002',
//         product: '毛裤',
//         totalCost: 80,
//     },
//     {
//         oid: '003',
//         product: '枸杞',
//         totalCost: 90,
//     },

// ];
// table.boot('#orderTable', orderStruct, orders,
//     {
//         Delete(tr,index) {
//             orders[index]=null;
       
//             tr.remove();
//         },
//        hightLine(tr) {
//             let klass = tr.classList;
//             let active = 'active';
//             if(klass.contains(active)){
//                 klass.remove(active);
//             }else{
//                 klass.add(active);
//             }
//             console.log('a');
//         },
//         //折扣价 discount
//         Discount(tr,index) {
//             let it = orders[index];
//             let sale = it.totalCost*0.8;
//            tr.cells[2].innerText = sale;
//            console.dir(tr);
//         },
//         Up(tr,i){
//             let up = i-1;
//             if(up<0)
//             return;

//             let temp = orders[up];
//             orders[up] = orders[i];
//             orders[i] = temp;
            
//             let brother = tr.previousElementSibling;
//             if(brother)
//             brother.insertAdjacentElement('beforebegin',tr);    
           
//         },
//         Down(tr,i){
//             let down = i+1;
//             if(down>orders.length)
//                 return;
                
//             let temp = orders[down];
//             orders[down] = orders[i];
//             orders[i] = temp;
            
//             let other = tr.nextElementSibling;
//             if(other)
//             other.insertAdjacentElement('afterend',tr);    
           
//         }
//     }
// );