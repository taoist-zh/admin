import {
  config,
} from '../../config/index';
import {
  http
} from "../request/request"


/** 获取使用记录 */
export function getHomeData(dto) {
  if (config.useMock) {
    // return mockFetchHome();
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