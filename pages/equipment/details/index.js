// pages/equipment/details/index.js
import Toast from 'tdesign-miniprogram/toast/index';
import {
  addAction,
  getrecord
} from "../../../services/action/action"
import {
  getDeviceOfUser
} from "../../../services/home/home"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: "admin",
    detail: {
      name: "默认名称"
    },
    useRecord: [],
    description: "",
    //状态枚举
    statusEnum: {
      "0": "可使用",
      "1": "使用中",
      "2": "维修中",
      "3": "报废"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options, "传参数")
    let data = JSON.parse(options.data)
    data.attr = JSON.parse(data.attr)
    let userIfo = wx.getStorageSync('userInfo')

    userIfo = JSON.parse(userIfo)
    this.setData({
      detail: data,
      role: userIfo.role,
      userId: userIfo.id,
      username: ""
    })
    this.init(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  init(data) {
    //查询当前使用人
    getDeviceOfUser(data.id).then((res) => {
      console.log("使用者", res)
      if (res.data.data[0].username) {
        console.log()
        this.setData({
          username: res.data.data[0].username
        })
      }
    })
    //查询使用记录
    getrecord(data.id).then((res) => {
      console.log(res.data.data, "使用记录")
      let redord = res.data.data
      redord = redord.map((item, index) => {
        return {
          ...item,
          startTime: item.startTime.substr(0, 10),
          endTime: item.endTime != null ? item.endTime.substr(0, 10) : ""
        }
      })
      this.setData({
        useRecord: redord
      })
    })

  },
  onDesInput(e) {
    this.setData({
      description: e.detail.value
    })
  },
  applyUse(e) {
    let dto = {
      "userId": this.data.userId,
      "deviceId": this.data.detail.id,
      "applyType": 1,
      "description": this.data.description
    }
    console.log(dto, '申请参数')
    this.apply(dto)
  },
  applyBack(e) {
    console.log("申请归还")
    let dto = {
      "userId": this.data.userId,
      "deviceId": this.data.detail.id,
      "applyType": 2,
      "description": this.data.description
    }
    console.log(dto, '申请参数')
    this.apply(dto)
  },
  applyMaintenance(e) {
    console.log("申请维修")
    let dto = {
      "userId": this.data.userId,
      "deviceId": this.data.detail.id,
      "applyType": 3,
      "description": this.data.description
    }
    console.log(dto, '申请参数')
    this.apply(dto)
  },
  applyUnserviceable(e) {
    console.log("申请报废")
    let dto = {
      "userId": this.data.userId,
      "deviceId": this.data.detail.id,
      "applyType": 4,
      "description": this.data.description
    }
    console.log(dto, '申请参数')
    this.apply(dto)
  },
  passApply(e) {
    console.log("通过申请")
  },
  rejectApply(e) {
    console.log("驳回申请")
  },
  apply(dto) {
    addAction(dto).then((res) => {
      console.log(res.data.message)
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
          message: res.data.message
        });
      }
    })
  }
})