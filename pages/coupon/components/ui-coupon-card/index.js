Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  externalClasses: ['coupon-class'],

  properties: {
    applyStatus: {
      type: String,
      value: "",
    },
    applyType: {
      type: String,
      value: "",
    },
    description: {
      type: String,
      value: '',
    },
    deviceId: {
      type: String,
      value: '', // 优惠金额
    },
    userId: {
      type: String,
      value: '',
    },
    id: {
      type: String,
      value: '',
    },
    time: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    username: {
      type: String,
      value: '',
    },
    imgUrl: {
      type: String,
      value: '',
    },


  },

  data: {
    theme: 'primary',
  },

  observers: {
    status: function (value) {
      let theme = 'primary';
      // 已过期或已使用的券 颜色置灰
      if (value === 'useless' || value === 'disabled') {
        theme = 'weak';
      }

      this.setData({
        theme
      });
    },
  },

  attached() {
    this.setData({
      color: `color${this.properties.colorStyle}`,
    });
  },
});