import {
  config,
} from '../../config/index';
import {
  http
} from "../request/request"
/** 获取首页数据 */
function mockFetchHome() {
  const {
    delay
  } = require('../_utils/delay');

  return delay().then(() => {
    return {
      tabList: [{
          text: '示波器',
          typeId: 1001,
        },
        {
          text: '打印机',
          typeId: 1002,
        },
        {
          text: '电脑',
          typeId: 1003,
        },
        {
          text: '投影仪',
          typeId: 1004,
        },
        {
          text: '复印机',
          typeId: 1005,
        },
      ],
    };
  });
}

/** 获取首页数据 */
export function getHomeData(dto) {
  if (config.useMock) {
    return mockFetchHome();
  } else {
    return http({
      url: '/device',
      params: dto,
      method: "get",
    })
  }

}
//获取分类数据
export function getHomeTagData() {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/categorize',
      method: "get",
    })
  }
}

//修改分类数据
export function updateHomeTagData(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    return http({
      url: '/categorize',
      method: "put",
      data: dto
    })
  }
}


//修改分类数据
export function delHomeTagData(dto) {
  console.log(dto)
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/categorize',
      method: "DELETE",
      data: {
        id: dto.id
      }
    })
  }
}

//增加分类数据
export function addHomeTagData(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    return http({
      url: '/categorize',
      method: "post",
      data: {
        name: dto
      }
    })
  }
}
//增加设备信息
export function addHomeDevice(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    return http({
      url: '/device',
      method: "post",
      data: dto
    })
  }
}

//上传图片
//增加设备信息
export function addDeviceImg(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    return http({
      url: '/device',
      method: "post",
      data: dto
    })
  }
}


//修改设备信息
export function updateDevice(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    return http({
      url: '/device',
      method: "put",
      data: dto
    })
  }
}
//删除设备信息
export function delDevice(id) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    // console.log(dto)
    return http({
      url: '/device',
      method: "delete",
      data: {
        id
      }
    })
  }
}