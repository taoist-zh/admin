/* eslint-disable no-param-reassign */
import {
  getSearchResult
} from '../../../services/equipment/fetchSearchResult';
import Toast from 'tdesign-miniprogram/toast/index';


Page({
  data: {
    equipmentsList: [],
    attrName: '',
    attrVal: '',
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
      const result = await getSearchResult(params);
      if (result.code == '1000') {
        let data = result.data;
        if (data.length == 0) {
          this.total = totalCount;

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
          equipmentsList: data,

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
    this.setData({
      attrName: value
    });
  },

  onAttrValAction(e) {
    const {
      value
    } = e.detail;
    this.setData({
      attrVal: value
    });
  },

  reset() {
    this.setData({
      attrName: '',
      attrVal: ''
    });
  },

  confirm() {
    const {
      attrName,
      attrVal
    } = this.data;

    //按筛选条件请求数据
  },
});