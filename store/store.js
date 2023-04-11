import {
  observable,
  action
} from 'mobx-miniprogram'
//  按需导出store实例
export const store = observable({
  //  共享数据字段          
  token: "",
  userName: "",
  avatar: "",
  role: "student",


  //  定义计算属性 get表示sum属性是只读的           
  // get sum(){
  //     return this.numA + this.numB
  // },

  //  actions方法，用来修改store中的数据 
  setToken: action(function (token) {
    this.token = token
  }),
  setRole: action(function (setRole) {
    this.setRole = setRole
  }),
  setAvatar: action(function (avatar) {
    this.avatar = avatar
  }),
  setUserName: action(function (userName) {
    this.userName = userName
  })
})