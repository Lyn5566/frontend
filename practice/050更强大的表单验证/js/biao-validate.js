;(function () {
    'use strict';
  
    // 基础验证规则
    let is = {
      /**
       * 是否为数字
       * @param {number} value
       * @return {boolean}
       */
      numeric(value) {
        if (!/^\d+$/.test(value.toString()))
          throw '不是合法的数字';
      },
  
      /**
       * 是否大于指定数字
       * @param {number} value
       * @param {number} comparison 最小值
       * @return {boolean}
       */
      min(value, comparison) {
        if (value < comparison)
          throw '不可小于' + comparison;
      },
  
      /**
       * 是否小于指定数字
       * @param {number} value
       * @param {number} comparison 最大值
       * @return {boolean}
       */
      max(value, comparison) {
        if (value > comparison)
          throw '不可大于' + comparison;
      },
  
      /**
       * 是否在两个值之间
       * @param {number} value
       * @param {number} min
       * @param {number} max
       * @return {boolean}
       */
      between(value, min, max) {
        if (
          !this.min(value, min) ||
          !this.max(value, max)
        )
          throw '必须小于' + max + '且大于' + min;
      },
  
      /**
       * 是否是正数
       * @param {number} value
       * @return {boolean}
       */
      positive(value) {
        if (!this.numeric(value))
          return false;
  
        if (value <= 0)
          throw '不可小于0';
      },
  
      /**
       * 是否为负数
       * @param value
       * @return {boolean}
       */
      negative(value) {
        if (!this.numeric(value))
          return false;
  
        if (value >= 0)
          throw '不可大于0';
      },
  
      /**
       * 字符串是否小于指定长度
       * @param {string} value
       * @param {number} comparison
       * @return {boolean}
       */
      minLength(value, comparison) {
        if (value.length < comparison)
          throw '长度不可小于' + comparison;
      },
  
      /**
       * 字符串是否大于指定长度
       * @param {string} value
       * @param {number} comparison
       * @return {boolean}
       */
      maxLength(value, comparison) {
        if (value.length > comparison)
          throw '长度不可大于' + comparison;
      },
  
      /**
       * 字符串是否在指定长度之间
       * @param {string} value
       * @param {number} min
       * @param {number} max
       * @return {*|boolean}
       */
      lengthBetween(value, min, max) {
        if (!this.minLength(value, min) ||
          !this.maxLength(value, max))
          throw '长度需介于' + min + '至' + max + '之间';
      },
  
      /**
       * 字符串是否以某段字符开始
       * @param {string} value
       * @param {string} comparison
       * @return {*|boolean}
       */
      startsWith(value, comparison) {
        if (!value.startsWith(comparison))
          throw '必须以"' + comparison + '"开头';
      },
  
      /**
       * 字符串是否以某段字符结束
       * @param {string} value
       * @param {string} comparison
       * @return {*|boolean}
       */
      endsWith(value, comparison) {
        if (!value.endsWith(comparison))
          throw '必须以"' + comparison + '"结束';
      },
  
      includes(value, comparison) {
        if (!value.includes(comparison))
          throw '必须包含"' + comparison + '"';
      },
  
      /**
       * 在数组中
       * @param {mix} value
       * @param {Array} comparison
       */
      in(value, comparison) {
        if (comparison.indexOf(value) === -1)
          throw '必须在' + comparison + '之重';
      },
  
      /**
       * 邮箱格式是否合法
       * @param {string} value
       * @return {boolean}
       */
      email(value) {
        let re = /^\w+@\w+\.\w+$/;
        if (!re.test(value))
          throw '不合法的邮箱';
      },
  
      /**
       * 用户名格式是否合法
       * @param {string} value
       * @return {boolean}
       */
      username(value) {
        let re = /^[a-zA-Z0-9]\w+$/;
        if (!re.test(value))
          throw '不合法的用户名';
      },
  
      /**
       * 手机号格式是否合法
       * @param {string} value
       * @param {string} country 所在国家
       * @return {boolean}
       */
      phone(value, country = 'zh') {
        let re;
  
        switch (country) {
          case 'zh':
            re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
            break;
        }
  
        if (!re.test(value))
          throw '不合法的手机号';
      },
  
      /**
       * 是否可以匹配正则
       * @param value
       * @param re 用于匹配的正则表达式
       * @return {boolean}
       */
      regex(value, re) {
        if (typeof re == 'string')
          re = new RegExp(re);
  
        if (!re.test(value))
          throw '不合法的格式';
      },
    };
  
    // 暴露接口
    window.valee = {
      validate,
      is,
      applyRules,
      boot,
    };
  
    /**
     * 通过字符串规则验证
     * @param {*} value 如：'whh'
     * @param {string} strRule 如：'username|max:12'
     * @return {Array} 错误信息，如：['用户名格式有误', '长度不可超过12位']
     */
    function validate(value, strRule) {
      return applyRules(value, parseRules(strRule));
    }
  
    /**
     * 指定要验证的input或form
     * @param {string} selector
     */
    function boot(selector) {
      let el = document.querySelector(selector);
  
      // 如果是表单元素
      if (el.nodeName == 'FORM') {
        // 绑定提交事件，确保提交时能验证一次
        bindSubmit(el);
        // 绑定键盘事件，每次修改都会验证
        bindFormKeyup(el);
      } else { // 如果是其他元素：input, textarea, select...
        // 绑定键盘事件，每次修改都会验证
        bindInputKeyup(el);
      }
    }
  
    /**
     * 为input绑定键盘事件
     * @param {HTMLElement} input
     */
    function bindInputKeyup(input) {
      // 每次有键抬起
      input.addEventListener('keyup', e => {
        // 开始验证并获取错误信息
        let errors = validateInput(input);
        // 显示错误信息
        showInputError(input, errors);
      });
    }
  
    /**
     * 验证单个input
     * @param input
     * @return {Array}
     */
    function validateInput(input) {
      // 获取data-rule中的规则
      let rule = input.dataset.rule;
      // 获取输入的值
      let value = input.value;
      // 验证并拿到错误信息
      let errors = validate(value, rule);
  
      return errors;
    }
  
    /**
     * 验证表单
     * @param {HTMLFormElement} form
     */
    function validateForm(form) {
      // 找到提交按钮，因为如果表单数据不合法就需要禁用提交按钮
      let submit = form.querySelector('[type=submit]');
      // 选中所有需要验证的input
      let inputs = form.querySelectorAll('[data-rule]');
      // 循环每个input
      inputs.forEach(input => {
        // 验证并拿到错误
        let errors = validateInput(input);
  
        // 如果验证通过，就解禁提交按钮
        if (!errors.length) {
          submit.disabled = false;
        } else { // 否则
          // 禁用提交按钮
          submit.disabled = true;
        }
  
        // 显示错误信息
        showInputError(input, errors);
      });
    }
  
    /**
     * 绑定表单中的键盘事件
     * @param {HTMLFormElement} form
     */
    function bindFormKeyup(form) {
      // 当任何一项可能发生改变时
      form.addEventListener('keyup', e => {
        // 开始验证
        validateForm(form);
      });
    }
  
    /**
     * 绑定表单提交事件
     * @param form
     */
    function bindSubmit(form) {
      // 当表单提交时
      form.addEventListener('submit', e => {
        e.preventDefault();
  
        // 验证整个表单的数据
        validateForm(form);
      });
    }
  
    /**
     * 显示单个input的错误信息
     * @param {HTMLElement} input 输入组件
     * @param {Array} errors 错误信息
     */
    function showInputError(input, errors) {
      // 如果通过了验证（没有错误信息）
      if (!errors.length) {
        // 就隐藏错误信息（可能是前一次验证生成的）
        if (input.$errorContainer)
          input.$errorContainer.hidden = true;
        return;
      }
  
      // 如果没有错误信息容器
      // <input>
      //    <div class="error"></div>  <== 错误信息容器
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error')) {
        // 就造一个 ==> <div>
        // 然后将其缓存在input元素中，方便下次验证时使用
        let ec = input.$errorContainer = document.createElement('div');
        // 添加error类 ==> <div class="error">
        ec.classList.add('error');
        // 将其添加在input后面（弟弟的位置）
        input.insertAdjacentElement('afterend', ec);
      }
  
      // 循环errors，生成错误信息
      let html = '';
      errors.forEach(err => {
        html += `<div>${err}</div>`;
      });
  
      // 替换以前的错误信息
      input.$errorContainer.innerHTML = html;
      // 显示错误信息
      input.$errorContainer.hidden = false;
    }
  
  
    /**
     * 批量验证多条规则（一条数据，多种限制）
     * @param {*} value 验证的值：123
     * @param {Array} rules 解析好的规则对象：{numeric:true, min:3, max:12}
     */
    function applyRules(value, rules) {
      // 准备错误信息
      let errors = [];
  
      // 循环验证规则，如：
      // {min: 10, max: 20}
      for (let key in rules) {
        // 以 min:10 为例
        // key就是'min'
        // ru就是10
        let ru = rules[key];
  
        try {
          // 相当于 is.min(6, 10)
          is[key](value, ru);
        } catch (e) { // 捕获验证错误
          // 推入错误数组中
          errors.push(e);
        }
      }
  
      // 返回错误数组
      return errors;
    }
  
    /**
     * 解析规则
     * @param {string} str 原始字符串规则：'numeric|min:3|max:12'
     */
    function parseRules(str) {
      // 初始化规则对象，
      // 解析好的规则都会放到这个对象中
      let rule = {};
  
      // 由大到小拆分规则
      // 以'numeric|min:3|max:12'为例
      // 先用'|'拆分，得到数组：
      // ['numeric', 'min:3', 'max:12']
      let ruleArr = str.split('|');
  
      // 循环数组，继续拆分
      ruleArr.forEach(it => {
        // 使用':'拆分
        // 设it为'min:3'
        // itArr就等于 ['min', '3']
        let itArr = it.split(':');
  
        // 第一项为键
        let key = itArr[0];
        // 第二项为值
        let comparison = itArr[1];
  
        // 这些规则的值应该是数字类型
        let numRules = [
          'numeric', 'min', 'max',
          'between', 'minLength', 'maxLength',
        ];
  
        // 如果没有值，说明是xxx:true的简写
        if (!comparison) {
          comparison = true;
        } else { // 否则
          // 如果是数字类型的规则就将其转换为数字类型
          // 否则会给下游造成隐患
          if (numRules.indexOf(key) !== -1)
            comparison = parseFloat(comparison);
  
          if (key == 'in') {
            comparison = comparison.split(',');
          }
        }
  
        // 将当前规则放到规则对象里
        rule[key] = comparison;
      });
  
      // 返回解析好的规则中
      return rule;
    }
  })();
  
  /*
  |--------------------------------------------------------------------------
  | 业务逻辑
  |--------------------------------------------------------------------------
  */
  
  valee.boot('form');
  valee.boot('#search');