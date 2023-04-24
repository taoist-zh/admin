import {
  fetchCouponList
} from '../../../services/coupon/index';

Page({
  data: {
    role: "admin",
    status: 0,
    list1: [{
        text: '未处理',
        key: 0,
      },
      {
        text: '已处理',
        key: 1,
      }
    ],
    list2: [{
        text: '待处理',
        key: 0,
      },
      {
        text: '已通过',
        key: 1,
      },
      {
        text: '已驳回',
        key: 2,
      },
    ],

    couponList: [

    ],
  },

  onLoad() {
    this.init();
  },
  onShow() {
    this.getTabBar().init();
  },
  init() {
    this.fetchList();
  },

  fetchList(status = this.data.status) {
    let statusInFetch = '';
    switch (Number(status)) {
      case 0: {
        statusInFetch = 'default';
        break;
      }
      case 1: {
        statusInFetch = 'useless';
        break;
      }
      case 2: {
        statusInFetch = 'disabled';
        break;
      }
      default: {
        throw new Error(`unknown fetchStatus: ${statusInFetch}`);
      }
    }
    fetchCouponList(statusInFetch).then((couponList) => {
      this.setData({
        couponList
      });
    });
  },

  tabChange(e) {
    const {
      value
    } = e.detail;

    this.setData({
      status: value
    });
    this.fetchList(value);
  },

  goHomeHandle() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  onPullDownRefresh_() {
    this.setData({
        couponList: [],
      },
      () => {
        this.fetchList();
      },
    );
  },
});