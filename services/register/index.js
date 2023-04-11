import {
  config,
} from '../../config/index';

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
      url: '/api/admin/base/open/login',
      method: "post",
      data

    })
  }

}