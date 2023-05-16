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
//查询使用记录
export function getrecord(dto) {
  if (config.useMock) {
    return mockFetchHome();
  } else {
    return http({
      url: '/apply/uselist',
      params: {
        deviceId: dto
      },
      method: "get",
    })
  }

}
/** 添加申请 */
export function addAction(dto) {
  if (config.useMock) {
    return mockFetchHome();
  } else {
    return http({
      url: '/apply/add',
      data: dto,
      method: "post",
    })
  }

}

//查看申请记录
export function getRecord(params) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    // var params = {
    //   applyStatus: applyStatus
    // }
    // if (!!id) {
    //   params.userId = id
    // }
    return http({
      url: '/apply/list',
      method: "get",
      params
    })
  }

}

//处理请求
export function dealApply(id, type) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/apply/deal',
      method: "post",
      data: {
        "id": id,
        "applyStatus": type
      }
    })
  }

}
/** 获取个人数据 */
export function getDeviceByuser(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/device/foruser',
      params: dto,
      method: "get",
    })
  }

}