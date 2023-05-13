/* eslint-disable no-param-reassign */
import {
  getDeviceLike
} from '../../../services/home/home';
import Toast from 'tdesign-miniprogram/toast/index';


Page({
  data: {
    equipmentsList: [],
    attrName: '',
    attrVal: '',
    attrList: [{
      attrName: '',
      attrVal: '',
    }],
    hasLoaded: false,
    keywords: '',
    loadMoreStatus: 0,
    loading: true,
  },

  total: 0,
  pageNum: 1,
  pageSize: 30,

  onLoad(options) {
    const {
      searchValue = ''
    } = options || {};
    this.setData({
        keywords: searchValue,
      },
      () => {
        this.init(true);
      },
    );
  },

  generalQueryData(reset = false) {
    const {
      keywords,
      attrVal,
      attrName
    } = this.data;
    const {
      pageNum,
      pageSize
    } = this;

    const params = {
      attrVal: attrVal,
      attrName: attrName,
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
    };
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    const {
      loadMoreStatus,
      equipmentsList = []
    } = this.data;

    const params = this.generalQueryData(reset);
    if (loadMoreStatus !== 0) return;
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      console.log(params, 'pa')
      const result = await getDeviceLike(params);
      console.log(result, 'getDeviceLike')
      if (result.data.code == '200') {
        let data = result.data;
        if (data.length == 0) {
          this.total = data.length;

          this.setData({
            emptyInfo: {
              tip: '抱歉，未找到相关设备',
            },
            hasLoaded: true,
            loadMoreStatus: 0,
            loading: false,
            equipmentsList: [],
          });
          return;
        }
        this.setData({
          equipmentsList: data.data,

        });
      } else {
        this.setData({
          loading: false,
        });
        wx.showToast({
          title: '查询失败，请稍候重试',
        });
      }
    } catch (error) {
      this.setData({
        loading: false,
      });
    }
    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

  handleSubmit(e) {
    this.setData({
      keywords: e.detail.value,
      equipmentsList: [],
      loadMoreStatus: 0,
    }, );
    this.init(true);
  },


  //去设备详情页面
  gotoGoodsDetail(e) {
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  // handleFilterChange(e) {
  //   const {
  //     overall,
  //     sorts
  //   } = e.detail;
  //   const {
  //     total
  //   } = this;
  //   const _filter = {
  //     sorts,
  //     overall,
  //   };
  //   this.setData({
  //     filter: _filter,
  //     sorts,
  //     overall,
  //   });

  //   this.pageNum = 1;
  //   this.setData({
  //       goodsList: [],
  //       loadMoreStatus: 0,
  //     },
  //     () => {
  //       total && this.init(true);
  //     },
  //   );
  // },

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  onAttrNameAction(e) {
    const {
      value
    } = e.detail;
    const {
      index
    } = e.currentTarget.dataset
    console.log(e)
    this.data.attrList[index].attrName = value


  },

  onAttrValAction(e) {
    const {
      value
    } = e.detail;
    const {
      index
    } = e.currentTarget.dataset
    console.log(e)
    this.data.attrList[index].attrVal = value
  },

  reset() {
    this.setData({
      attrList: [{
        attrName: '',
        attrVal: '',
      }]
    });
  },

  async confirm() {
    console.log(this.data.attrList, 'arrtlist')
    let attrString = {}
    this.data.attrList.forEach((item, index) => {
      // let endTag = index == this.data.attrList.length - 1 ? "" : ","
      attrString[item.attrName] = item.attrVal
      // attrString += item.attrName + ":" + item.attrVal + endTag
    })
    attrString = JSON.stringify(attrString)
    attrString = attrString.substr(1, attrString.length - 2)
    console.log(attrString)

    let result = await getDeviceLike({
      attr: attrString,
      name: ""
    });
    if (result.data.code == '200') {
      let data = result.data;
      if (data.length == 0) {
        this.total = data.length;

        this.setData({
          emptyInfo: {
            tip: '抱歉，未找到相关设备',
          },
          hasLoaded: true,
          loadMoreStatus: 0,
          loading: false,
          equipmentsList: [],
        });
        return;
      }
      this.setData({
        equipmentsList: data.data,

      });
    } else {
      this.setData({
        loading: false,
      });
      wx.showToast({
        title: '查询失败，请稍候重试',
      });
    }
    //按筛选条件请求数据

  },
  addAttr() {
    this.setData({
      attrList: [...this.data.attrList, {
        attrName: '',
        attrVal: '',
      }]
    })
  }
});