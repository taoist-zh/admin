import Toast from 'tdesign-miniprogram/toast';
import {
  getUserList,
  updateUserInfo,
  addUser
} from '../../../../services/user/user';

Page({
  options: {
    multipleSlots: true,
  },
  externalClasses: ['theme-wrapper-class'],
  data: {
    userInfo: {
      id: "",
      username: "",
      email: "",
      password: ""
    },
    type: "edit"

  },

  onLoad(options) {
    console.log(options, "options")
    const {
      id,
      type
    } = options;
    console.log(id)
    this.setData({
      type: type
    })
    this.init(id, type);
  },

  onUnload() {

  },


  init(id, type) {
    if (type != "add") {
      getUserList(id).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res.data.data[0])
          this.setData({
            userInfo: {
              id: res.data.data[0].id,
              username: res.data.data[0].username,
              email: res.data.data[0].email,
              password: "",
              phone: res.data.data[0].phone,
            }
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
    } else {
      this.setData({
        userInfo: {
          id: "",
          username: "",
          email: "",
          password: "",
          phone: "",
        }
      })
    }

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

  formSubmit() {
    console.log("baocun")
    if (this.data.type == "add") {
      let params = JSON.parse(JSON.stringify(this.data.userInfo))
      delete params.id
      editUser(params).then((res) => {
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
    } else {
      updateUserInfo(this.data.userInfo).then((res) => {
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
    }

  },

});