; (function () {
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
        throw '必须在' + comparison + '之中';
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

  //暴露接口

  window.valid = {
    is,
    validate,
    applyRule,
    boot,
  };
  function validate(value, strRules) {
    return applyRule(value, parseRule(strRules));
  }
  //指定要验证的是input或者form
  function boot(selector) {
    let el = document.querySelector(selector);
    if (el.nodeName == 'FORM') {
      bindFormSumit(el);
      bindFormKeyup(el);
    }else{
      bindInputKeyup(el);
    }

  }

  function bindFormSumit(form) {

    form.addEventListener('submit', e => {
      e.preventDefault();
      validateForm(form);
    })
  }

  function bindFormKeyup(formEl){

    formEl.addEventListener('keyup',e =>{
     
      validateForm(formEl);
    })
  }
  function bindInputKeyup(inputEl){
    inputEl.addEventListener('keyup', e=>{

      let errors = validateInput(inputEl);
      showInputErros(inputEl,errors);
    })
  }

 
  //单个表单的数据验证信息
  function validateForm(form){
    let submit = form.querySelector('[type=submit]');
      //拿到所有input
    let inputs = form.querySelectorAll('[data-rule]');
      inputs.forEach(input => {
        let errors = validateInput(input);
        // console.log(errors)
        if (!errors.length)
          //没有错误，提交按钮禁止点击
          submit.disabled = true;
        else
          submit.disabled = false;

        //显示错误信息
        showInputErros(input,errors);
      })
    
  }

  function showInputErros(input,errs){
    
    if(!errs.length){
      if(input.$errorContainer)
      input.$errorContainer.hidden = true;
      return;
    }
    //是否有包括error的错误信息容器
      let nextInput = input.nextElementSibling;
      let errorInputExist=nextInput.classList.contains('error');
      //如果不存下就创建一个新的div容器在追加到当前input后面
      if(!errorInputExist || ! nextInput){
        let errorDiv =input.$errorContainer= document.createElement('div');
        errorDiv.classList.add('error');
        //在当前input后面添加一个<div></div>
         input.insertAdjacentElement('afterend',errorDiv);
      }
      let html = '';
      errs.forEach(err =>{
        html += `<div>${err}</div>`;
      })
      input.$errorContainer.innerHTML = html;
      input.$errorContainer.hidden = false;
  }

  function validateInput(input) {
    let inputRule = input.dataset.rule;
    let inputValue = input.value;
    let errors = validate(inputValue, inputRule);
    return errors;
  }

  //批量验证多条规则(一条数据多种验证)
  /**
   * 
   * @param {*} value 例：123
   * @param {*} rules 例：规则对象{numeric:true | min:3 | max :12}
   */

  function applyRule(value, rules) {
    let errors = [];
    //key=min
    for (let key in rules) {
      //ru=3,ru=12 ...
      let ru = rules[key];
      try {
        is[key](value, ru);
      } catch (e) {
        errors.push(e);
      }
    }
    return errors;
  }

  //str:"numeric | min:1 |max:12"
  //解析验证规则
  function parseRule(str) {

    let arrStr = str.split('|');

    let rule = {};
    // console.log(arrStr);
    arrStr.forEach(it => {
      let ruleIt = it.split(':');
      //[min,1]
      //[max,12]
      let key = ruleIt[0];
      let comparison = ruleIt[1];
      //是数字的
      let numRule = ['numeric', 'min', 'max',
        'between', 'minLength', 'maxLength'];
      if (!comparison) {
        comparison = true;

      } else {
        //如果是数字类型，就将其转换成数字类型
        if (numRule.indexOf(key) !== -1) {
          comparison = parseFloat(comparison);
        }
        //其它情况
        //"in:male,female"
        if (key == 'in') {
          comparison = comparison.split(',');
        }

      }
      rule[key] = comparison;

    })
    return rule;

  };

})();
