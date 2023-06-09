import {
  fetchUserCenter
} from '../../services/usercenter/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';
var userInfo = JSON.parse(wx.getStorageSync('userInfo'))
var menuDatalist = userInfo.role == "admin" ? [{
  title: '用户管理',
  tit: '',
  url: '',
  type: 'userlist',
}] : []
const menuData = [
  ...menuDatalist,
  {
    title: '个人信息',
    tit: '',
    url: '',
    type: 'userInfo',
  },


];
var orderTagInfosItem = userInfo.role == "admin" ? [{
    title: '待审核',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '已审核',
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 2,
  },
  {
    title: '已拒绝',
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 3,
  },
] : [{
    title: '使用中',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '维修',
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 2,
  },
  {
    title: '已报废',
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 3,
  },
];
const orderTagInfos = orderTagInfosItem;

const getDefaultData = () => ({
  // showMakePhone: false,
  userInfo: userInfo,
  menuData,
  orderTagInfos,
  // customerServiceInfo: {},
  // currAuthStep: 1,


  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {},

  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {


  },



  onClickCell({
    currentTarget
  }) {
    const {
      type
    } = currentTarget.dataset;
    console.log(type)
    switch (type) {
      case 'userlist': {
        wx.navigateTo({
          url: '/pages/usercenter/user/list/index'
        });
        break;
      }
      case 'userInfo': {
        wx.navigateTo({
          url: "/pages/usercenter/person-info/index",
        });
        break;


      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.status;
    console.log(status, 'status')
    if (status == 1) {
      // wx.setStorageSync('applyStatus', 1);
      wx.navigateTo({
        url: '/pages/coupon/device/index?status=1',

      })

    } else if (status == 2) {
      // wx.setStorageSync('applyStatus', 2);
      wx.navigateTo({
        url: '/pages/coupon/device/index?status=2',

      })
    } else if (status == 3) {
      // wx.setStorageSync('applyStatus', 3);
      wx.navigateTo({
        url: '/pages/coupon/device/index?status=3',

      })
    }
  },

  jumpAllOrder() {
    wx.navigateTo({
      url: '/pages/coupon/device/index'
    });
  },
  gotoUserEditPage() {
    const {
      currAuthStep
    } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({
        url: '/pages/usercenter/person-info/index'
      });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  loginOut() {
    console.log("推出登陆")
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});