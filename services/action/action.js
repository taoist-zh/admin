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