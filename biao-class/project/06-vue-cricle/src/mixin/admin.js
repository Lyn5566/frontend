import Pagination        from '../component/Pagination';
import { call as valee } from '../lib/valee';
import api from '../lib/api'

export default {
  components : { Pagination },
  data () {
    return {
      ui         : {
        formShow : false,
      },
      pageParams : {
        limit : 5,
        page  : 1,
      },
      totalCount : 0,
      form       : {},
      list       : [],
      timer      : null,

      // 定义主表单中所有验证规则
      // {
      //   属性名: {
      //     规则1: {
      //       params: [...], 给验证器函数的传参
      //       msg: '...' 错误信息
      //     },
      //     规则2: ...
      //   }
      // },

      // formStatus : {},


      // 记录所有的主表单错误
      // {
      //   属性名: {
      //     规则1: true, 不合法
      //     规则2: false, 合法
      //   }
      // }
      errors : {
        // username : {
        //   unique : false,
        //   min    : true,
        // },
      },
    };
  },
  mounted () {
    this.read();
  },
  methods    : {
    debounceValide (field) {
      if (this.timer)
        clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },

    /**
     * 验证一个属性（如username）
     * @param {string} field e.g. 'username'
     */
    validate (field) {
      let value      = this.form[ field ];
      let fieldValid = true;
      // 先拿到所有的规则
      // {
      //   lengthBetween : {
      //     params : [ 4, 12 ],
      //       msg    : '最小长度需在4至12位之间',
      //   }
      //   required : {
      //       msg    : '此项为必填项',
      //   }
      // }
      let rules = this.rules[ field ];

      // 检查每一条规则是否合法
      for (let key in rules) {
        // 比如说是lengthBetween
        // {
        //   params : [ 4, 12 ],
        //     msg    : '最小长度需在4至12位之间',
        // }
        let rule   = rules[ key ];
        let params = rule.params || [];

        // 调用biao valee对应的验证函数
        // 比如说valee.lengthBetween('whh', 4, 12)
        let valid = valee(key, value, ...params);

        if (typeof valid == 'boolean') {
          this.afterValidate(field, key, valid);
          if (!valid)
            fieldValid = false;
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
            // if (!r)
            //   fieldValid = false;
          });
        }
      }

      return fieldValid;
    },

    validateForm () {
      let rules = this.rules;
      let valid = true;

      for (let field in rules) {
        if (!this.validate(field))
          valid = false;
      }

      return valid;
    },

    /**
     * 当某一个字段的某一个规则验证完毕时
     * @param {string} field
     * @param {bool} valid
     */
    afterValidate (field, key, valid) {
      // 拿到对应的错误对象
      let fieldObj = this.errors[ field ];

      // 如果不存在，就初始化一个空对象
      if (!fieldObj)
        fieldObj = this.$set(this.errors, field, {});

      // 将对象中对应的验证规则设为valee返回的结果
      // 如：fieldObj['lengthBetween'] = true;
      this.$set(fieldObj, key, !valid);
    },

    createOrUpdate () {
      if(this.beforeCreateOrUpdate)
        this.beforeCreateOrUpdate();
      if (!this.validateForm())         
        return;

      let action   = 'create';
      let isUpdate = this.form.id;

      if (isUpdate)
        action = 'update';

      api(`${this.model}/${action}`, this.form)
        .then(r => {
          if(r.success)
          // if(this.afterCreateOrUpdate)
          //   this.afterCreateOrUpdate();         
          this.read();
          this.resetForm();
          this.hideForm();
        });
    },

    read () {
      // if(this.beforeRead)
      //   this.beforeRead();

      api(`${this.model}/read`, this.pageParams)
        .then(r => {
          // if(this.afterRead)
          //   this.afterRead();
          this.list  = r.data;
          this.totalCount = r.total;
        });
    },

    remove (id) {
      // if(this.beforeRemove)
      //   this.beforeRemove();

      if (!confirm('确定删除？'))
        return;

      api(`${this.model}/delete`, { id })
        .then(r => {
          if(r.success)
          // if(this.afterRemove)
          //   this.afterRemove();
          this.read()
        });
    },

    toggleForm () {
      if (this.ui.formShow) {
        this.hideForm();
      } else {
        this.resetForm();
        this.showForm();
      }
    },

    hideForm () {
      this.ui.formShow = false;
    },

    showForm () {
      this.ui.formShow = true;
    },

    resetForm () {
      this.errors = {};
      this.form   = {};
    },
    //页面跳转：通过跳转哪页来获取当前页的数据并渲染
    turnPage (page) {
      
      this.pageParams.page = page;
      this.read();
    },

    fill (it) {
      this.form = it;
    },

    fillAndShow (it) {
      this.fill(it);
      this.showForm();
    },
  },
};
