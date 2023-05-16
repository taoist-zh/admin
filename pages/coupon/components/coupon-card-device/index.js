import {
  dealApply
} from "../../../../services/action/action";
import Toast from 'tdesign-miniprogram/toast/index';
const statusMap = {
  default: {
    text: '待处理',
    theme: 'primary'
  },
  useless: {
    text: '已处理',
    theme: 'default'
  },
  disabled: {
    text: '已驳回',
    theme: 'default'
  },

};
Component({
  options: {
    // addGlobalClass: true,
    // multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  // externalClasses: ['coupon-class1'],

  properties: {
    couponDTO: {
      type: Object,
      value: {}, // 申请数据
    },
    status: {
      type: Number,
      value: 1,
    },
  },

  data: {
    btnText: '',
    btnTheme: '',
    role: "student",
  },

  attached() {
    let userInfo = wx.getStorageSync('userInfo')
    userInfo = JSON.parse(userInfo)
    this.setData({
      role: userInfo.role
    })

  },

  methods: {
    rejectApply(e) {

      const {
        id
      } = e.currentTarget.dataset;
      dealApply(id, 3).then((res) => {
        if (res.data.code == 200) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        }
      })
    },
    passApply(e) {

      const {
        id
      } = e.currentTarget.dataset;
      dealApply(id, 2).then((res) => {
        if (res.data.code == 200) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        }
      })
    },
    applyAgain(e) {
      const {
        id
      } = e.currentTarget.dataset;
      dealApply(id, 1).then((res) => {
        if (res.data.code == 200) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.data.message,
          });
        }
      })
    },
    godetail(e) {
      const {
        id
      } = e.currentTarget.dataset;
      console.log(this.data.couponDTO, 'this.data.couponDTO')
      wx.navigateTo({
        url: '/pages/equipment/details/index?data=' + JSON.stringify(this.data.couponDTO),
      })
    }
  },
});