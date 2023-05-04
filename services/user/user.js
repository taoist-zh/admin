import {
  config,
} from '../../config/index';
import {
  http
} from "../request/request"


/** 获取首页数据 */
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
//获取所有用户
export function getUserList(id) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    var params = !id ? {} : {
      id: id
    }
    return http({
      url: '/user',
      method: "get",
      params: params
    })
  }
}

//修改用户数据
export function updateUserInfo(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    console.log(dto)
    if (dto.password == "") {
      delete dto.password
    }
    return http({
      url: '/user/update',
      method: "put",
      data: dto
    })
  }
}
//新增用户
export function addUser(dto) {
  console.log(dto)
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/user',
      method: "post",
      data: dto
    })
  }
}

//删除用户
export function delUser(id) {
  console.log(id)
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    return http({
      url: '/user',
      method: "DELETE",
      params: {
        id: id
      }
    })
  }
}

//修改个人信息
export function editUser(dto) {
  if (config.useMock) {
    // return mockFetchHome();
  } else {
    if (dto.password == "") {
      delete dto.password
    }
    console.log(dto)
    return http({
      url: '/user',
      method: "put",
      data: dto
    })
  }
}