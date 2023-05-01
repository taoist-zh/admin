import {
  login as handleLogin
} from "../../services/login/index"
import Toast from 'tdesign-miniprogram/toast/index';
//公共状态管理
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    passWord: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //  把store中的属性和方法绑定到页面上
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['token', 'userName', 'avatar', 'role'],
      actions: ['setToken', "setRole", "setUserName", "setAvatar"]
    })
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
  //登陆
  login() {
    console.log(this.data.userName)
    console.log(this.data.passWord)
    handleLogin({
      username: this.data.userName,
      password: this.data.passWord
    }).then((res) => {
      if (res.data.code == 200) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '登陆成功',
        });
        wx.setStorageSync("token", res.data.data.token)
        setTimeout(() => {
          wx.switchTab({
            url: "/pages/home/home"
          })
        }, 1000)
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '用户名或密码错误',
        });
      }
    })
  },
  goRegister() {
    wx.navigateTo({
      url: '/pages/register/index',
    })
  }
})