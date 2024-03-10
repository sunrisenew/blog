---
title: 禁用微信浏览器H5页面中的字体缩放功能
tag:
  - 微信
  - H5
---

为了提高页面的可访问性，使用微信内置浏览器打开H5页面时，用户可以通过点击右上角菜单中的`调整字体`来放大或缩小文字，以达到最佳的阅读效果。这个功能对于许多老人或者视力障碍人士非常有用，但是如果页面没有专门适配不同的字体大小，那么页面布局就会变得非常混乱。

在之前的工作中有两个页面需要使用[html2canvas](https://github.com/niklasvh/html2canvas)直接将页面转换为分享海报，如果不禁用字体缩放功能，那么生成的海报图片会完全乱掉，无法展示活动信息也无法扫描活动二维码。

所以如果这项功能对业务常用人群没有太大的作用或者某些页面强制要求禁止缩放，我们可以禁用这项功能。
<!-- more -->
## 解决方法

### iOS

在iOS系统中是通过给`body`设置`-webkit-text-size-adjust`属性来调整的，所以可以通过添加下面的CSS代码来禁用字体缩放功能。

``` css
body {
  text-size-adjust: none !important;
  -webkit-text-size-adjust: none !important;
  -moz-text-size-adjust: none !important;
}
```

### Android

安卓系统中调整字体大小的实现是通过改变浏览器的渲染行为实现的，所以无法通过简单添加一些属性来禁用。经过搜索发现可以重写点击字体调整菜单时触发的事件来禁用缩放行为。

``` js{14-21,36-41}
/**
 * Disable the font size scaling function, only for Android.
 * For iOS, just set the css property 'text-size-adjust' to 'none !important'.
 */
export function disableFontSizeScaling() {
  if (!isAndroidBrowser()) {
    return
  }
  if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
    handleFontSize()
  } else {
    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
  }
  function handleFontSize() {
    // Set font size as default.
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
    // Override the callback of setting font.
    WeixinJSBridge.on('menu:setfont', () => {
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
    })
  }
}

/**
 * Enable the font size scaling function, only for Android.
 */
export function enableFontSizeScaling() {
  if (!isAndroidBrowser()) {
    return
  }
  if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
    handleFontSize()
  } else {
    document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
  }
  function handleFontSize() {
    // Resume the callback of setting font.
    WeixinJSBridge.on('menu:setfont', param => {
      WeixinJSBridge.invoke('setFontSizeCallback', param)
    })
  }
}
```
