import {
  config,
} from '../../config/index';
import {
  http
} from "../request/request"

function mockFetchLogin(data) {
  if (data.username = "admin" && data.password == "123456") {
    return new Promise((resolve) => {

      //异步操做
      setTimeout(function () {
        resolve({
          data: {
            code: "1000",
            message: "登陆成功"
          }
        });
      }, 500);
    })
  } else {


    return new Promise((resolve) => {

      //异步操做
      setTimeout(function () {
        resolve({
          data: {
            code: "1000",
            message: "用户名密码错误"
          }
        });
      }, 500);
    })


  }
}



export const login = (data) => {
  if (config.useMock) {
    return mockFetchLogin(data);

  } else {
    return http({
      url: '/api/admin/base/open/login',
      method: "post",
      data

    })
  }

}