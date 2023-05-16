import {
  getHomeData,
  getHomeTagData,
  updateHomeTagData,
  delHomeTagData,
  addHomeTagData,
  addHomeDevice,
  updateDevice,
  delDevice
} from '../../services/home/home';
import {
  getEquipmentsList
} from '../../services/equipment/getEquipmentsList';
import Toast from 'tdesign-miniprogram/toast/index';
//公共状态管理
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({
  data: {
    tabList: [],
    tabListFi: [],
    equipmentsList: [],
    equipmentsListFi: [],
    equipmentsListLoadStatus: 0,
    pageLoading: false,
    typeId: "",
    currentStatus: "all",
    role1: "student",
    addTagVisible: false,
    addDeviceVisible: false,
    newTabName: "",
    isShowAddTab: false,
    addDevicevisible: false,
    pickerTabvisible: false,
    fileList: [],
    status: false,
    isAddDevice: true, //增加设备弹出层，底下按钮是增加还是修改
    newTabName: "",
    addDeviceForm: {
      id: "",
      categorizeId: null,
      name: "",
      deviceNumber: "",
      description: "",
      attr: '',
      imgUrl: ""
    },
    //状态分类
    product: {
      value: 'all',
      options: [{
          value: 'all',
          label: '全部状态',
        },
        {
          value: '0',
          label: '可使用',
        },
        {
          value: '1',
          label: '使用中',
        },
        {
          value: '2',
          label: '维修中',
        },
        {
          value: '3',
          label: '已经报废',
        },
      ],
    },
    equipmentsListPagination: {
      index: 0,
      num: 20,
    },
  },





  onShow() {


    this.getTabBar().init();
  },

  onLoad() {
    //  把store中的属性和方法绑定到页面上
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['token', 'userName', 'avatar'],
    })
    let userIfo = wx.getStorageSync('userInfo')

    userIfo = JSON.parse(userIfo)

    this.setData({
      role: userIfo.role
    })
    console.log(this.data.role)

    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init(true);
  },

  init(fresh) {

    this.loadHomePage(true);
  },

  loadHomePage(fresh) {
    //停止刷新
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    //获取分类数据
    getHomeTagData().then((res) => {
      if (res.data.code == 200) {
        console.log(res.data.data)
        let list = JSON.parse(JSON.stringify(res.data.data))
        list = list.map((item, index) => {
          return {
            label: item.name,
            value: item.id
          }
        })
        list.push({
          label: "暂不分类",
          value: null
        })
        this.setData({
          tabList: [...res.data.data, {
            name: "未分类",
            categorizeId: null
          }],
          tabListFi: list,
          pageLoading: false,
          typeId: res.data.data[0].id
        });
        //获取设备数据
        console.log(this.data.typeId, 'id======')
        let id = fresh ? this.data.typeId : res.data.data[0].id
        getHomeData({
          categorizeId: id
        }).then((res) => {

          if (res.data.code == 200) {
            console.log(res.data.data)
            this.setData({
              equipmentsList: res.data.data,
              equipmentsListFi: res.data.data
            })
          }
        })
      }
    })

    // getHomeData().then(({
    //   tabList
    // }) => {
    //   this.setData({
    //     tabList,
    //     pageLoading: false,
    //     typeId: tabList[0].typeId
    //   });
    //   //加载设备数据
    //   this.loadEquipment(true);
    // });
  },

  tabChangeHandle(e) {
    this.data.typeId = this.data.tabList[parseInt(e.detail.value)].id;
    this.setData({
      'product.value': "all",
    })
    
    this.loadEquipment(false, this.data.typeId);
  },

  onReTry() {
    this.loadGoodsList();

  },
  async loadEquipment(fresh = false, typeId) {
    console.log("shuaixn233")
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
      //获取设备数据
      getHomeData({
        categorizeId: typeId
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data)


          this.setData({
            equipmentsList: res.data.data,
            equipmentsListFi: res.data.data
          })
        }
      })
    } else {
      //获取设备数据
      getHomeData({
        categorizeId: typeId
      }).then((res) => {
        if (res.data.code == 200) {
          this.setData({
            equipmentsList: res.data.data,
            equipmentsListFi: res.data.data
          })
        }
      })
    }
    //如果是刷新，滚到顶部
    // if (fresh) {
    //   wx.pageScrollTo({
    //     scrollTop: 0,
    //   });
    // };
    // this.setData({

    //   equipmentsListLoadStatus: 1
    // });

    // const pageSize = this.data.equipmentsListPagination.num;
    // let pageIndex = this.data.equipmentsListPagination.index + 1;
    // let typeId = this.data.typeId;
    // if (fresh) {
    //   pageIndex = 0;
    // }
    // //
    // try {
    //   const nextList = await getEquipmentsList(pageIndex, pageSize, typeId);
    //   //如果是新增就重新赋值，如果是下拉更多就追加数据
    //   let nextListFi = fresh ? nextList : this.data.equipmentsList.concat(nextList)
    //   nextListFi = nextListFi.filter((item) => {
    //     if (this.data.currentStatus == "all") {
    //       return item
    //     } else if (item.status == this.data.currentStatus) {
    //       return item
    //     }

    //   })
    //   console.log(nextListFi)
    //   this.setData({
    //     equipmentsList: fresh ? nextList : this.data.equipmentsList.concat(nextList),
    //     equipmentsListFi: nextListFi,
    //     equipmentsListLoadStatus: 0,
    //   });
    //   console.log(nextList)
    //   this.data.equipmentsListPagination.index = pageIndex;
    // } catch (err) {
    //   this.setData({
    //     equipmentsListLoadStatus: 3
    //   });
    // }
  },
  handlePopup() {
    this.setData({
      addTagVisible: true,
    })
  },
  // onVisibleChange(e) {
  //   this.setData({
  //     addTagVisible: e.detail.visible,
  //   });
  // },
  onClose() {
    console.log("guanbi ")
    this.setData({
      addTagVisible: false,
    });
  },
  updatTab(e) {
    console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.index
    if (index == this.data.tabList.length - 1) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '此分类不能修改',
      });
      return
    }
    updateHomeTagData(this.data.tabList[index]).then((res) => {
      console.log(res.data.code)
      if (res.data.code == 200) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
      }
    })
  },
  delTab(e) {
    console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.index
    if (index == this.data.tabList.length - 1) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '此分类不能修改',
      });
      return
    }

    delHomeTagData(this.data.tabList[index]).then((res) => {
      console.log(res.data.code)
      if (res.data.code == 200) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
        let tablist = JSON.parse(JSON.stringify(this.data.tabList))
        let list = JSON.parse(JSON.stringify(res.data.data))
        list = list.map((item, index) => {
          return {
            label: item.name,
            value: item.id
          }
        })
        list.push({
          label: "暂不分类",
          value: null
        })
        tablist.splice(index, 1)
        this.setData({
          tabList: tablist,
          tabListFi: list
        })
      }
    })
  },
  addTabList() {
    this.setData({
      isShowAddTab: true
    })
    let tablist = JSON.parse(JSON.stringify(this.data.tabList))
    // tablist.unshift({
    //   name:"请命名"
    // })
    // this.setData({

    // })
  },
  addTabInputChange(e) {
    this.data.newTabName = e.detail.value
  },
  addTab() {
    let tablist = JSON.parse(JSON.stringify(this.data.tabList))
    // tablist.unshift({
    //   name:"请命名"
    // })
    // this.setData({

    // })
    let that = this
    console.log(this.data.newTabName, 'xinzeng')
    addHomeTagData(this.data.newTabName).then((res) => {
      if (res.data.code == 200) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
        tablist.push(res.data.data)
        console.log(tablist)
        that.setData({
          tablist: tablist,
          isShowAddTab: false,

        })
        setTimeout(() => {
          that.setData({
            addTagVisible: false

          })

        }, 1000)
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: res.data.message,
        });
      }
    })
  },
  cancelAdd() {
    this.setData({
      isShowAddTab: false
    })
  },
  tabInputChange(e) {
    let index = e.currentTarget.dataset.index
    this.data.tabList[index].name = e.detail.value
    console.log(this.data.tabList)
  },
  showAddDevice() {
    this.setData({
      addDevicevisible: true,
      isAddDevice: true
    })
  },
  onClose1() {
    this.setData({
      addDevicevisible: false
    })
  },
  onTabPicker() {
    this.setData({
      pickerTabvisible: true
    })
  },
  onColumnChange(e) {
    this.setData({
      "addDeviceForm.categorizeId": e.detail.value[0],
      newTabName: e.detail.label[0]
    })
  },
  onPickerCancel() {
    console.log(this.data.addDeviceForm)
    this.setData({
      pickerTabvisible: false
    })
  },
  onNameInput(e) {
    this.setData({
      "addDeviceForm.name": e.detail.value
    })
  },
  onNumberInput(e) {
    this.setData({
      "addDeviceForm.deviceNumber": e.detail.value
    })
  },
  onDesInput(e) {
    this.setData({
      "addDeviceForm.description": e.detail.value
    })
  },
  onAttrInput(e) {
    let attr = this.extractAttributes(e.detail.value)
    this.data.addDeviceForm.attr = JSON.stringify(attr)
  },
  extractAttributes(str) {
    console.log(str)
    const regex = /([^,]+):([^,]+)/g;
    const attributes = {};
    let match;

    while ((match = regex.exec(str)) !== null) {
      const name = match[1];
      const value = match[2];
      attributes[name] = value;
    }

    return attributes;
  },
  handleAddDevice() {
    console.log(this.data.addDeviceForm, "数据信息")
    let params = JSON.parse(JSON.stringify(this.data.addDeviceForm))
    delete params.id
    addHomeDevice(params).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          addDevicevisible: false
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
  handleAdd(e) {
    const {
      fileList
    } = this.data;
    const {
      files
    } = e.detail;
    // 方法2：每次选择图片都上传，展示每次上传图片的进度
    let that = this
    files.forEach(file => that.uploadFile(file))
  },
  uploadFile(file) {
    const {
      fileList
    } = this.data;

    this.setData({
      fileList: [...fileList, {
        ...file,
        status: 'loading'
      }],
    });
    const {
      length
    } = fileList;
    console.log(file.url)
    const task = wx.uploadFile({
      url: 'http://localhost:3000/api/device/img', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success: (res) => {

        let {
          url
        } = JSON.parse(res.data)
        console.log(url, '图片路径')
        this.setData({
          [`fileList[${length}].status`]: 'done',
          "addDeviceForm.imgUrl": "http://localhost:3000" + url
        });
      },
    });
    task.onProgressUpdate((res) => {
      this.setData({
        [`fileList[${length}].percent`]: res.progress,
      });
    });
  },
  handleRemove(e) {
    const {
      index
    } = e.detail;
    const {
      fileList
    } = this.data;

    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },
  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/equipments/search/index'
    });
  },
  handelUpdateDevice(e) {
    const {
      item
    } = e.detail;
    console.log(item, "传递的值")
    let attr = JSON.parse(item.attr)
    let attr1 = ""
    Object.keys(attr).forEach((item, index) => {
      let douhao = (index == (Object.keys(attr).length - 1)) ? "" : ","
      attr1 += item + ":" + attr[item] + douhao
    })
    console.log(attr1)
    this.setData({
      isAddDevice: false,
      addDevicevisible: true,
      "addDeviceForm.id": item.id,
      "addDeviceForm.name": item.name,
      "addDeviceForm.categorizeId": item.categorizeId,
      "addDeviceForm.deviceNumber": item.deviceNumber,
      "addDeviceForm.description": item.description,
      "addDeviceForm.imgUrl": item.imgUrl,
      "addDeviceForm.attr": attr1,
      fileList: [{
        url: item.imgUrl,
        name: 'uploade.png',
        type: 'image',
      }]
    })

  },
  handleUpdateDevice() {
    console.log(this.data.addDeviceForm, "数据信息")
    let params = JSON.parse(JSON.stringify(this.data.addDeviceForm))
    if (params.attr.indexOf("{") == -1) {
      let attr = this.extractAttributes(params)
      params.attr = JSON.stringify(attr)
    }
    updateDevice(params).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          addDevicevisible: false
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
  handelDel(e) {
    const {
      id
    } = e.detail;
    console.log(id, "传递的值")
    delDevice(id).then((res) => {
      if (res.data.code == 200) {
        this.setData({
          addDevicevisible: false
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
  onChange(e) {
    this.setData({
      currentStatus: e.detail.value,
      'product.value': e.detail.value,
      equipmentsListFi: this.data.equipmentsList.filter((item) => {
        if (e.detail.value == item.status) {
          return item
        } else if (e.detail.value == "all") {
          return item
        }
      })
    })

  }
});