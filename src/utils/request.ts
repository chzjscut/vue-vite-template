import qs from 'qs';
import axios from 'axios';
import { message } from 'ant-design-vue';
// import store from '@/store'
import Cookies from 'js-cookie';
import urlencode from 'urlencode';
//import { getToken, getJobNumber, getName, getImToken } from '@/utils/auth'

// axios.defaults.headers.post['content-type'] = 'application/json;charset=utf-8';
// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  // baseURL: 'http://172.38.0.226:8088/', //刘思远
  // baseURL: 'http://172.22.12.153:8088/', //孟学潮
  // baseURL: 'http://172.24.215.9:8088/', //测试服
  // headers: {'content-type': 'application/json;charset=utf-8'},
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const commonParams = {
      'x-requested-with': 'XMLHttpRequest',
      // sysRole: permision || '',
      //cpytoken: Cookies.get('cpytoken'),
      //token: Cookies.get('satoken'),
      //userInfo: urlencode(Cookies.get('userInfo') || ''),
      //jobNumber: getJobNumber(),
      //web_site: 'customer-web',
      //name: encodeURIComponent(getName())
    };
    config.headers = commonParams;

    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }
    // Object.assign(config.headers, commonParams);
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  async (response) => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.msg);
    }
    return {
      result: res,
    };
  },
  (error) => {
    console.log(1, error)
    message.error(error.response.data.message || 'Error', 3);
    //console.log(111, typeof error, error.response) // for debug
    if (error.response.status === 403) {
      const redirect = error.response.headers.redirect || '';
      //console.log(redirect)
      window.location.href = redirect;
    }
    return Promise.reject(error);
  },
);

export default service;
