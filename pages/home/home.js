import {
  getHomeData
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

    getHomeData().then(({
      tabList
    }) => {
      this.setData({
        tabList,
        pageLoading: false,
        typeId: tabList[0].typeId
      });
      //加载设备数据
      this.loadEquipment(true);
    });
  },

  tabChangeHandle(e) {
    this.data.typeId = this.data.tabList[parseInt(e.detail.value)].typeId;
    this.loadEquipment(true);
  },

  onReTry() {
    this.loadGoodsList();

  },
  async loadEquipment(fresh = false) {
    //如果是刷新，滚到顶部
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    };
    this.setData({

      equipmentsListLoadStatus: 1
    });

    const pageSize = this.data.equipmentsListPagination.num;
    let pageIndex = this.data.equipmentsListPagination.index + 1;
    let typeId = this.data.typeId;
    if (fresh) {
      pageIndex = 0;
    }
    //
    try {
      const nextList = await getEquipmentsList(pageIndex, pageSize, typeId);
      //如果是新增就重新赋值，如果是下拉更多就追加数据
      let nextListFi = fresh ? nextList : this.data.equipmentsList.concat(nextList)
      nextListFi = nextListFi.filter((item) => {
        if (this.data.currentStatus == "all") {
          return item
        } else if (item.status == this.data.currentStatus) {
          return item
        }

      })
      console.log(nextListFi)
      this.setData({
        equipmentsList: fresh ? nextList : this.data.equipmentsList.concat(nextList),
        equipmentsListFi: nextListFi,
        equipmentsListLoadStatus: 0,
      });
      console.log(nextList)
      this.data.equipmentsListPagination.index = pageIndex;
    } catch (err) {
      this.setData({
        equipmentsListLoadStatus: 3
      });
    }
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