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
export function getHomeData() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}