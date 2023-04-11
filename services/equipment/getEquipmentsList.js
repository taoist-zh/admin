import {
  config
} from '../../config/index';

/** 获取商品列表 */
function mockFetchequipmentsList(pageIndex = 1, pageSize = 20, typeId) {
  const {
    delay
  } = require('../_utils/delay');
  return delay().then(() => {

    return Array.apply(null, {
      length: pageSize
    }).map((item, index) => {
      return {
        id: index + typeId,
        title: typeId + "设备" + index,
        status: index % 4,
        description: "一个设备一个设备一个设备一个设备一个设备一个设备",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      }
    })
  });
}

/** 获取商品列表 */
export function getEquipmentsList(pageIndex = 1, pageSize = 20, typeId) {
  if (config.useMock) {
    return mockFetchequipmentsList(pageIndex, pageSize, typeId);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}