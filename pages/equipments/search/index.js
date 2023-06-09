import {
  getSearchHistory,
} from '../../../services/equipment/fetchSearchHistory';

Page({
  data: {
    historyWords: [],
    popularWords: [],
    searchValue: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
  },

  deleteType: 0,
  deleteIndex: '',

  onShow() {
    this.queryHistory();
  },

  async queryHistory() {

    this.setData({
      historyWords: wx.getStorageSync('historyWords')
    })
    // try {
    //   const data = await getSearchHistory();
    //   const code = 'Success';
    //   if (String(code).toUpperCase() === 'SUCCESS') {
    //     const {
    //       historyWords = []
    //     } = data;
    //     this.setData({
    //       historyWords,
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  },


  confirm() {
    const {
      historyWords
    } = this.data;
    const {
      deleteType,
      deleteIndex
    } = this;
    historyWords.splice(deleteIndex, 1);
    if (deleteType === 0) {
      this.setData({
        historyWords,
        dialogShow: false,
      });
    } else {
      this.setData({
        historyWords: [],
        dialogShow: false
      });
    }
  },

  close() {
    this.setData({
      dialogShow: false
    });
  },

  handleClearHistory() {
    const {
      dialog
    } = this.data;
    this.deleteType = 1;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除所有历史记录',
      },
      dialogShow: true,
    });
    wx.setStorageSync('historyWords', [])
  },

  deleteCurr(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const {
      dialog
    } = this.data;
    this.deleteIndex = index;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除当前历史记录',
        deleteType: 0,
      },
      dialogShow: true,
    });
  },

  handleHistoryTap(e) {
    const {
      historyWords
    } = this.data;
    const {
      dataset
    } = e.currentTarget;
    const _searchValue = historyWords[dataset.index || 0] || '';
    if (_searchValue) {
      wx.navigateTo({
        url: `/pages/equipments/result/index?searchValue=${_searchValue}`,
      });
    }
  },

  handleSubmit(e) {
    const {
      value
    } = e.detail;
    console.log(value)
    let historyWords = wx.getStorageSync('historyWords')
    wx.setStorageSync('historyWords', [...historyWords, value])
    this.setData({
      historyWords: [...this.data.historyWords, value]
    })
    console.log(this.data.historyWords)
    if (value === 0) return;
    wx.navigateTo({
      url: `/pages/equipments/result/index?searchValue=${value}`,
    });
  },
});