import {
  config,
} from '../../config/index';
import {
  http
} from "../request/request"

function mockFetchRegister(data) {
  return new Promise((resolve) => {
    //异步操做
    setTimeout(function () {
      resolve({
        data: {
          code: "1000",
          message: "注册成功"
        }
      });
    }, 500);
  })

}



export const handleRegister = (data) => {
  if (config.useMock) {
    return mockFetchRegister(data);

  } else {
    return http({
      url: '/user',
      method: "post",
      data

    })
  }

}