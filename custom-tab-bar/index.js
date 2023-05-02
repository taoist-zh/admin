import TabMenu from './data';

Component({
  data: {
    active: 0,
    list: [{
      icon: 'home',
      text: '设备',
      url: 'pages/home/home',
    },
    {
      icon: 'sort',
      text: '管理',
      url: "pages/coupon/coupon-list/index",
    },
  
    {
      icon: 'person',
      text: '个人中心',
      url: 'pages/usercenter/index',
    },
  ],
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail.value });
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    init() {
      var userInfo=wx.getStorage("userInfo")
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
    },
  },
});
