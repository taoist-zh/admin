// pages/equipment/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: "admin",
    detail: {
      name: "默认名称"
    },
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
    this.setData({
      detail: data
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
    //查询使用记录

  },
  applyUse() {
    console.log("申请使用")
  },
  applyMaintenance() {
    console.log("申请维修")
  },
  applyUnserviceable() {
    console.log("申请报废")
  },
  passApply() {
    console.log("通过申请")
  },
  rejectApply() {
    console.log("驳回申请")
  }
})