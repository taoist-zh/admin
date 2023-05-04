/* eslint-disable no-param-reassign */
import {
  getUserList,
  delUser
} from '../../../../services/user/user';
import Toast from 'tdesign-miniprogram/toast';
// import {
//   resolveAddress,
//   rejectAddress
// } from './util';
// import {
//   getAddressPromise
// } from '../edit/util';

Page({

  data: {
    userList: [],
  },



  onLoad() {
    this.init();
  },

  init() {
    this.getList()
  },
  onUnload() {

  },
  getList() {
    getUserList().then((res) => {
      console.log(res)
      if (res.data.code == 200) {
        this.setData({
          userList: res.data.data
        })
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

  deleteAddressHandle(e) {
    console.log("shanchu ", e)
    delUser(e.detail.id).then((res) => {
      console.log(res)
      if (res.data.code == 200) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
        this.getList()
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
      }
    })
  },
  editAddressHandle({
    detail
  }) {
    const params = JSON.stringify(detail)

    wx.navigateTo({
      url: "/pages/usercenter/user/edit/index?id=" + detail.id
    });
  },

  createHandle() {
    wx.navigateTo({
      url: "/pages/usercenter/user/edit/index?type=add"
    });
  },


});