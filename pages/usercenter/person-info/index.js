import {
  editUser
} from '../../../services/user/user';

import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    userInfo: {
      id: "",
      avatar: '',
      username: '',
      email: "",
      phone: '',
      password: ""
    },
    showUnbindConfirm: false,
    typeVisible: false,
  },
  onLoad() {
    var userInfo = wx.getStorageSync('userInfo')
    userInfo = JSON.parse(userInfo)
    this.init(userInfo, false);
  },
  init(userInfo, fresh) {
    delete userInfo.token
    userInfo.password = ""
    this.setData({
      userInfo: userInfo
    })
  },
  formSubmit() {
    console.log("baocun", this.data.userInfo)
    editUser(this.data.userInfo).then((res) => {
      console.log(res)
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
  onInputValue(e) {
    const {
      value = ''
    } = e.detail;
    console.log(e)
    const {
      item
    } = e.currentTarget.dataset
    this.setData({
      [`userInfo.${item}`]: value,
    });

  },


  async toModifyAvatar() {
    try {
      const tempFilePath = await new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            const {
              path,
              size
            } = res.tempFiles[0];
            if (size <= 10485760) {
              resolve(path);
            } else {
              reject({
                errMsg: '图片大小超出限制，请重新上传'
              });
            }
          },
          fail: (err) => reject(err),
        });
      });
      const tempUrlArr = tempFilePath.split('/');
      const tempFileName = tempUrlArr[tempUrlArr.length - 1];
      Toast({
        context: this,
        selector: '#t-toast',
        message: `已选择图片-${tempFileName}`,
        theme: 'success',
      });
    } catch (error) {
      if (error.errMsg === 'chooseImage:fail cancel') return;
      Toast({
        context: this,
        selector: '#t-toast',
        message: error.errMsg || error.msg || '修改头像出错了',
        theme: 'error',
      });
    }
  },
});