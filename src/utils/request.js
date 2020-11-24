import axios from "axios";
import { message } from "ant-design-vue";
// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  baseURL: "http://localhost:8081/"
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = localStorage.getItem("token");

    config.headers["Authorization"] = token;

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log(res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      message.error({
        content: res.msg || "Error",
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        localStorage.removeItem("token");
        location.reload();
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res.data;
    }
  },
  error => {
    console.log("err" + error); // for debug
    message.error({
      content: error.message || "Error"
    });
    return Promise.resolve(error);
  }
);

export default service;
