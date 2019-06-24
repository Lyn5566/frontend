/*
|--------------------------------------------------------------------------
| biaoValee.js
|--------------------------------------------------------------------------
| 通过字符串规则快速验证
| 动态显示input或表单的错误信息
*/

import api from './api';

// 基础验证规则
export let is = {
  /**
   * 必填项
   * @param value
   */
  required (value) {
    return !!(value || value === 0);
  },

  /**
   * 是否为数字
   * @param {number} value
   * @return {boolean}
   */
  numeric (value) {
    if (!/^\d+$/.test(value.toString()))
      return false;
    return true;
  },

  /**
   * 是否大于指定数字
   * @param {number} value
   * @param {number} comparison 最小值
   * @return {boolean}
   */
  min (value, comparison) {
    if (value < comparison)
      return false;
    return true;
  },

  /**
   * 是否小于指定数字
   * @param {number} value
   * @param {number} comparison 最大值
   * @return {boolean}
   */
  max (value, comparison) {
    if (value > comparison)
      return false;
    return true;
  },

  /**
   * 是否在两个值之间
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @return {boolean}
   */
  between (value, min, max) {
    if (
      !this.min(value, min) ||
      !this.max(value, max)
    )
      return false;
    return true;
  },

  /**
   * 是否是正数
   * @param {number} value
   * @return {boolean}
   */
  positive (value) {
    if (!this.numeric(value))
      return false;

    if (value <= 0)
      return false;
    return true;
  },

  /**
   * 是否为负数
   * @param value
   * @return {boolean}
   */
  negative (value) {
    if (!this.numeric(value))
      return false;

    if (value >= 0)
      return false;
    return true;
  },

  /**
   * 字符串是否小于指定长度
   * @param {string} value
   * @param {number} comparison
   * @return {boolean}
   */
  minLength (value, comparison) {
    if (value.length < comparison)
      return false;
    return true;
  },

  /**
   * 字符串是否大于指定长度
   * @param {string} value
   * @param {number} comparison
   * @return {boolean}
   */
  maxLength (value, comparison) {
    if (value.length > comparison)
      return false;
    return true;
  },

  /**
   * 字符串是否在指定长度之间
   * @param {string} value
   * @param {number} min
   * @param {number} max
   * @return {*|boolean}
   */
  lengthBetween (value, min, max) {
    if (!this.minLength(value, min) ||
      !this.maxLength(value, max))
      return false;
    return true;
  },

  /**
   * 字符串是否以某段字符开始
   * @param {string} value
   * @param {string} comparison
   * @return {*|boolean}
   */
  startsWith (value, comparison) {
    if (!value.startsWith(comparison))
      return false;
    return true;
  },

  /**
   * 字符串是否以某段字符结束
   * @param {string} value
   * @param {string} comparison
   * @return {*|boolean}
   */
  endsWith (value, comparison) {
    if (!value.endsWith(comparison))
      return false;
    return true;
  },

  includes (value, comparison) {
    if (!value.includes(comparison))
      return false;
    return true;
  },

  /**
   * 在数组中
   * @param {mix} value
   * @param {Array} comparison
   */
  in (value, comparison) {
    if (comparison.indexOf(value) === -1)
      return false;
    return true;
  },

  /**
   * 邮箱格式是否合法
   * @param {string} value
   * @return {boolean}
   */
  email (value) {
    let re = /^\w+@\w+\.\w+$/;
    if (!re.test(value))
      return false;
    return true;
  },

  /**
   * 用户名格式是否合法
   * @param {string} value
   * @return {boolean}
   */
  username (value) {
    let re = /^[a-zA-Z0-9]\w+$/;
    if (!re.test(value))
      return false;
    return true;
  },

  /**
   * 手机号格式是否合法
   * @param {string} value
   * @param {string} country 所在国家
   * @return {boolean}
   */
  phone (value, country = 'zh') {
    let re;

    switch (country) {
      case 'zh':
        re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
        break;
    }

    if (!re.test(value))
      return false;
    return true;
  },

  /**
   * 是否可以匹配正则
   * @param value
   * @param re 用于匹配的正则表达式
   * @return {boolean}
   */
  regex (value, re) {
    if (typeof re == 'string')
      re = new RegExp(re);

    if (!re.test(value))
      return false;

    return true;
  },

  unique (value, model, action, property) {
    return api(`${model}/${action}`, {
      where : {
        and : {
          [ property ] : value,
        },
      },
    }).then(r => {
        return !r.data;
      });
  },
};

export function call (type, value, ...args) {
  if (type !== 'required' && !value && value !== 0)
    return true;

  return is[ type ](value, ...args);
}
