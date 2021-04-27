---
title: 创建自定义的Axios实例
tags:
  - 工具库
  - H5
  - JavaScript
  - AJAX
---

一般情况下我们不会直接使用默认的Axios对象来直接发送请求，而是根据项目中的具体情况使用自定义配置创建新的实例，以避免在每个请求中重复配置。
<!-- more -->
## 使用自定义配置

新建一个`axios.js`文件，然后调用`axios.create()`方法创建自定义实例，传入的参数会成为全局配置，对每个请求都生效。如果个别请求不需要或有其他不同的配置，需要在调用时传参以覆盖。

``` js
// axios.js
import axios from 'axios'

export const BASE_URL = '/api'

const instance = axios.create({
  /*
   * Config the global baseURL.
   * If the url DO NOT start with this baseURL, you need to override this config in current request.
   */
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    // To declare that this is an ajax request.
    'X-Requested-With': 'XMLHttpRequest'
  }
  // Use config 'noLoading: true' to disabled loading status for current request.
})

export default instance
```

## 计算当前正在执行的请求数量

在开发一个前后端分离的应用时，只要有API请求还未结束，就需要在页面上显示`加载中`的提示。要实现这样的功能，我们就要获取到当前正在执行的请求数量。受限于Axios库自身并不提供此类属性，我们可以自己实现，将请求数量挂载到Axios实例上。在此，我们使用Axios提供的拦截器功能来实现。

``` js{3-5,9,14,17,21-24}
// axios.js
instance.interceptors.request.use(config => {
  // Count requests.
  instance.count = instance.count || 0
  instance.count++

  return config
}, error => {
  decreaseRequestCount()
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  decreaseRequestCount()
  return response
}, error => {
  decreaseRequestCount()
  return Promise.reject(error)
})

function decreaseRequestCount() {
  instance.count = instance.count || 0
  instance.count && instance.count--
}
```

在计算请求数量的同时，我们也可以加入显示`加载中`状态的逻辑。

``` js{6-9,13,19,23}
instance.interceptors.request.use(config => {
  // Count requests.
  instance.count = instance.count || 0
  instance.count++

  // Use custom noLoading config to ignore showing loading.
  if (!config.noLoading) {
    showLoading()
  }
  return config
}, error => {
  decreaseRequestCount()
  !instance.count && hideLoading()
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  decreaseRequestCount()
  !instance.count && hideLoading()
  return response
}, error => {
  decreaseRequestCount()
  !instance.count && hideLoading()
  return Promise.reject(error)
})

function showLoading() {}

// Use debounce to avoid loading flickering.
function hideLoading() {}
```
