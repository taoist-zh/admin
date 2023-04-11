import {
  handleRegister
} from "../../services/register/index"
import Toast from 'pages/usercenter/address/edit//node_modules/tdesign-miniprogram/toast/index';

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    passWord: "",
    confirmPassWord: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  onUnload() {},

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
  //input双向绑定
  inputChange: function (e) {
    this.setData({
      [e.target.dataset.id]: e.detail.value
    })
  },
  inputChangeConfirm: function (e) {
    this.setData({
      [e.target.dataset.id]: e.detail.value
    })

  },
  //登陆
  register() {
    // console.log(this.data.userName)
    // console.log(this.data.passWord)
    // console.log(this.data.confirmPassWord)
    if (this.data.passWord != this.data.confirmPassWord) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '两次密码不一致',
      });
    } else {
      handleRegister({
        username: this.data.userName,
        password: this.data.passWord
      }).then((res) => {
        if (res.data.code == 1000) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '注册成功,准备跳转登陆页',
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }, 1500)
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '用户名或密码错误',
          });
        }
      })
    }

  },

})