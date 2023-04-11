// components/equipment-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    equipmentsList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: [{
        id: "1001",
        name: "设备1",
        description: "xx设备1的详细描述xx设备1的详细描述xx设备1的详细描述。",
        status: "0",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      },
      {
        id: "1002",
        name: "设备2",
        description: "xx设备1的详细描述xx设备1的详细描述xx设备1的详细描述。",
        status: "1",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      },
      {
        id: "1003",
        name: "设备3",
        description: "xx设备1的详细描述xx设备1的详细描述xx设备1的详细描述。",
        status: "2",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      },
      {
        id: "1003",
        name: "设备4",
        description: "xx设备1的详细描述xx设备1的详细描述xx设备1的详细描述。",
        status: "3",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDetail(e) {

      const {
        id
      } = e.currentTarget.dataset;
      console.log("去详情页", id)
      wx.navigateTo({
        url: '/pages/equipment/details/index?id=' + id,
      })
    }
  }
})