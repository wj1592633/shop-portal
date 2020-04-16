import router from '../../router';
import axios from 'axios'
import Qs from 'qs'
var sysConfig = require('@/assets/js/sysConfig')
// 跨域
// axios.defaults.withCredentials = true
axios.defaults.timeout = 20000
// 请求之前拦截
axios.interceptors.request.use(config => {
  // 判断token,有值则在header里面带上
  if (sessionStorage.Authorization) {
    config.headers.Authorization = sysConfig.accessTokenPre + sessionStorage.getItem(sysConfig.accessTokenKey);
    config.headers.refresh_jwt = sysConfig.accessTokenPre + sessionStorage.getItem(sysConfig.refreshTokenKey);
  } else {
  }
  return config
}, error => {
  return Promise.reject(error)
})
// http response 拦截器
axios.interceptors.response.use(
  response => {
    var tempData = response.data;
    // 未登陆，登陆过期
    if (tempData.state === 401){
      localStorage.removeItem(sysConfig.accessTokenKey);
      router.replace('/login')
      // 已经登陆，但是token超时，后端自动刷新token
    } else if (tempData.state === '202'){
      // 1、保存后端返回的token
      localStorage.setItem(sysConfig.accessTokenKey, tempData.accessToken);
      localStorage.setItem(sysConfig.refreshTokenKey, tempData.refreshToken);
      // 2、重新请求数据
    } else {
      return response
    }
  },
  err => {
    const code = err.response.status
    if (code === 401){
      router.replace('/login')
    }
    // oauth/login
    return Promise.reject(err)
  }
);
export default {
// get请求
  requestGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data)
        }],
        url: url,
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get请求不带参数
  requestQuickGet (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        // 成功用resolve回调函数接参
        resolve(res.data)
      }).catch(error => {
        // 失败用reject回调函数接参
        reject(error)
      })
    })
  },
  // post请求
  requestPost (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data)
        }],
        url: url,
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // post请求
  requestPostForm (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        resolve(res.data)// 注意res是axios封装的对象，res.data才是服务端返回的信息
      }).catch(error => {
        reject(error)
      })
    })
  },
  // put请求
  requestPut (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // delete请求
  requestDelete (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
// axios默认配置
// axios.defaults.timeout = 5000;          // 超时时间
// axios.defaults.baseURL = apiURL.apiUrl;  // 默认地址
// **整理数据格式**
/* axios.defaults.transformRequest = function (data) {
  data = Qs.stringify(data);
  return data;
}; */
