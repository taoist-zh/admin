import {
  getDeviceByuser
} from '../../../services/action/action';

Page({
  data: {
    id: "",
    role: "admin",
    status: 1,
    list1: [{
        text: '使用中',
        key: 1,
      },
      {
        text: '维修中',
        key: 2,
      },
      {
        text: '已报废',
        key: 3,
      }
    ],
    applyList: [

    ],
  },

  onLoad(options) {
    console.log(options, "options")
    let {
      status
    } = options
    let userInfo = wx.getStorageSync('userInfo')
    userInfo = JSON.parse(userInfo)
    if (!!status) {
      this.setData({
        role: userInfo.role,
        id: userInfo.id,
        status: status
      })
    } else {
      this.setData({
        role: userInfo.role,
        id: userInfo.id,
        // status: status
      })
    }

    // console.log(this.tabChange)

    this.init();
  },
  onShow() {

    // this.getTabBar().init();
  },
  init() {
    this.fetchList();
  },

  fetchList(status = this.data.status) {
    let params = {
      userId: this.data.id,
      type: status
    }
    getDeviceByuser(params).then((res) => {
      console.log(res.data.data, '申请记录')
      res.data.data.forEach((item, index) => {
        item.time = item.time.substr(0, 10)
      })
      this.setData({
        applyList: res.data.data
      })
    })
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