import {
  getRecord
} from '../../../services/action/action';
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    id: "",
    role: "admin",
    status: 1,
    list1: [{
        text: '未处理',
        key: 1,
      },
      {
        text: '已通过',
        key: 2,
      },
      {
        text: '已驳回',
        key: 3,
      }
    ],
    list2: [{
        text: '待处理',
        key: 1,
      },
      {
        text: '已通过',
        key: 2,
      },
      {
        text: '已驳回',
        key: 3,
      },
    ],

    applyList: [

    ],
  },

  onLoad() {
    let status = wx.getStorageSync('applyStatus')
    let userInfo = wx.getStorageSync('userInfo')
    userInfo = JSON.parse(userInfo)
    console.log(status, 'statusstatusstatusstatus')
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
    this.onLoad()
    this.getTabBar().init();
  },
  init() {
    this.fetchList();
  },

  fetchList(status = this.data.status) {
    let params = {
      applyStatus: status
    }
    console.log(status, 'statusstatusstatusstatus')
    if (this.data.role == "student") {
      params.userId = this.data.id
    }
    getRecord(params).then((res) => {
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
  toast(e) {
    //刷新数据
    this.fetchList(this.data.status);
    Toast({
      context: this,
      selector: '#t-toast',
      message: e.detail.value,
    });
  }
});