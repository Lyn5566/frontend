/*
|--------------------------------------------------------------------------
| 可过滤下拉菜单
|--------------------------------------------------------------------------
*/


;(function () {
    'use strict';
  
    // 暴露接口
    window.biaoDrop = {
      boot,
    };
  
    // 默认设置
    let defaultConfig = {
      display : 'name', // 用于显示的键
      // onSelect: f() {} 选择时执行的函数
    };
  
    /**
     * 启动
     * @param {string} selector Dropdown的容器选择器
     * @param {Array} list 用于渲染的数据
     * @param {Object} config 其他配置项
     */
    function boot (selector, list, config) {
      // 合并设置
      config = Object.assign({}, defaultConfig, config);
  
      // 选中插件挂载点
      let container = document.querySelector(selector);
  
      // 缓存数据至container元素中
      container.$list = list;
  
  
      prepare(container); // 准备基础界面
      setListVisible(container, false); // 一开始先隐藏列表
      render(container, list, config); // 渲染列表
      bindFocus(container, config); // 当聚焦时应该做什么
      bindClick(container, config); // 当点击时应该做什么
      bindSelect(container, config); // 当选择时应该做什么
      bindSearch(container, config); // 当搜索时应该做什么
    }
  
    /**
     * 准备基础界面
     * @param container
     */
    function prepare (container) {
      // 填充基础html
      container.innerHTML = `
      <div class="dropdown">
        <div class="filter">
          <input type="search">
        </div>
        <div class="list"></div>
      </div>`;
  
      // 缓存常用元素，省的后面再选
      container._list  = container.querySelector('.list');
      container._input = container.querySelector('[type=search]');
    }
  
    /**
     * 通过数据渲染选择列表
     * @param {HTMLElement} container 挂载点
     * @param {Array} list 用于渲染的数据列表
     * @param {Object} config 设置
     */
    function render (container, list, config) {
      let el = container._list;
  
      // 清空前一次渲染的内容
      el.innerHTML = '';
      // 循环数据
      // 以 [{name: 'whh'}, {name: 'lsd'}]为例
      list.forEach(it => {
        // 以 {name: 'lsd'} 为例
  
        // 造对应的选项元素
        // <div></div>
        let item = document.createElement('div');
  
        // <div class="item"></div>
        item.classList.add('item');
  
        // <div class="item">lsd</div>
        item.innerText = it[ config.display ];
  
        // 缓存对应数据在元素中
        item.$data = it;
  
        // 追加选项中在列表中
        el.appendChild(item);
      });
    }
  
    /**
     * 当选择时...
     * @param {HTMLElement} container
     * @param {Object} config
     */
    function bindSelect (container, config) {
      // 拿到回调函数，用户选择时调用
      let onSelect = config.onSelect;
  
      // 小缓存
      let input = container._input;
  
      // 如果列表被点击了
      container._list.addEventListener('click', e => {
  
        // 就获取被点击项目对应的数据
        let data = e.target.$data;
  
        // input中应该显示被选中的项目，而不是无动于衷
        input.value = data[ config.display ];
  
        // 隐藏列表
        setListVisible(container, false);
  
        // 触发回调，报告使用者那一项被选中了
        onSelect && onSelect(data);
      });
    }
  
    /**
     * 当搜索时...
     * @param {HTMLElement} container
     * @param {Object} config
     */
    function bindSearch (container, config) {
      // 小缓存
      let input = container._input;
      let list  = container.$list;
  
      // 当用户开始输入时
      input.addEventListener('keyup', e => {
        // 显示列表
        setListVisible(container, true);
  
        // 取到输入的关键词
        let keyword = input.value;
  
        // 过滤数据
        // .filter()的用法:
        //  ↓原始数组                         ↓过滤条件        ↓符合条件的新数组
        // [1, 2, 3].filter(num => { return num > 1 }) ==> [2, 3]
        let filtered = list.filter(it => {
          // 如果config.display为'name', 关键词是'sd'：
          // it.name.includes('lsd')
          return it[ config.display ].includes(keyword);
        });
  
        // 重新渲染过滤后的数据
        render(container, filtered, config);
      });
    }
  
    /**
     * 当搜索框聚焦时...
     * @param container
     */
    function bindFocus (container) {
      container._input.addEventListener('focus', e => {
        // 显示列表
        setListVisible(container, true);
      });
    }
  
    /**
     * 当插件被点击时...
     * @param container
     */
    function bindClick (container) {
      container.addEventListener('click', e => {
        // 如果点的是插件内部就算了
        if (e.target.closest('.dropdown'))
          return;
  
        // 否则隐藏选项列表
        setListVisible(container, false);
      });
    }
  
    /**
     * 设置显示/隐藏
     * @param container
     * @param {boolean} visible 是否可见
     */
    function setListVisible (container, visible = true) {
      container._list.hidden = !visible;
    }
  })();
  
  /*
  |--------------------------------------------------------------------------
  | 业务逻辑
  |--------------------------------------------------------------------------
  */
  
  ;(function () {
    'use strict';
  
  
    let list = [
      {
        id   : 1,
        name : '王花花',
      },
      {
        id   : 1,
        name : '牛花花',
      },
      {
        id   : 2,
        name : '李拴蛋',
      },
      {
        id   : 3,
        name : '赵可爽',
      },
    ];
  
    biaoDrop.boot('main', list, {
      display : 'name',
      onSelect (it) {
        console.log(it);
      },
    });
  })();