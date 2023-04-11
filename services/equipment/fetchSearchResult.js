/* eslint-disable no-param-reassign */
import {
  config
} from '../../config/index';

/** 获取搜索历史 */
function mockSearchResult(params) {
  const {
    keyword,
    pageSize
  } = params

  const {
    delay
  } = require('../_utils/delay');
  return delay().then(() => {
    let list = Array.apply(null, {
      length: 20
    }).map((item, index) => {
      return {
        id: index,
        title: keyword + index,
        status: index % 4,
        description: "一个设备一个设备一个设备一个设备一个设备一个设备",
        imgUrl: "https://img12.360buyimg.com/n1/jfs/t1/187616/29/29241/32928/636e6c8bEa04b9c0c/7c285710cb64c679.jpg.avif"
      }
    })
    return {
      code: 1000,
      data: list
    }
  });
}
/** 获取搜索历史 */
export function getSearchResult(params) {
  if (config.useMock) {
    return mockSearchResult(params);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}