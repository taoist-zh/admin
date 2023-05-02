import {
  getHomeData,
  getHomeTagData,
  updateHomeTagData,
  delHomeTagData,
  addHomeTagData
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
    equipmentsList: [],
    equipmentsListFi: [],
    equipmentsListLoadStatus: 0,
    pageLoading: false,
    typeId: "",
    currentStatus: "all",
    role: "student",
    addTagVisible: false,
    addDeviceVisible: false,
    newTabName: "",
    isShowAddTab: false,
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
    typeId: "",
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
      fields: ['token', 'userName', 'avatar', 'role'],
    })
    let userIfo = wx.getStorageSync('userInfo')
    userIfo = JSON.parse(userIfo)
    this.setData({
      role: userIfo.role
    })
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    //停止刷新
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    //获取分类数据
    getHomeTagData().then((res) => {
      if (res.data.code == 200) {
        console.log(res.data.data)
        this.setData({
          tabList: [...res.data.data, {
            name: "未分类",
            categorizeId: null
          }],
          pageLoading: false,
          typeId: res.data.data[0].id
        });
        //获取设备数据
        getHomeData({
          categorizeId: res.data.data[0].id
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
        tablist.splice(index, 1)
        this.setData({
          tabList: tablist
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
  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/equipments/search/index'
    });
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