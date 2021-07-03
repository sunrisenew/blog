---
title: 使用PDF.js在H5页面中渲染PDF文档
tags:
  - 工具库
  - H5
  - JavaScript
  - PDF
---

工作中经常会遇到一个需求是在H5页面中渲染PDF文档，虽然现在许多浏览器都支持直接打开预览，但是不同的浏览器中体验并不完全一致，且有些浏览器点击PDF文档链接后是下载行为，这样的用户体验并不好。有时我们甚至需要开发一些自定义需求来显示PDF，这时`Mozilla`开源的`PDF.js`库就可以满足我们的需求。
<!-- more -->
## 安装PDF.js

先给出`PDF.js`的官方文档和仓库地址：

- 文档：<https://mozilla.github.io/pdf.js/>
- 仓库：<https://github.com/mozilla/pdf.js>

阅读文档后发现，官方只给出了下载源文件或使用CDN的方式，并没有给出如何使用npm安装。经过一番搜索后发现官方还有另一个库[pdfjs-dist](https://github.com/mozilla/pdfjs-dist)发布到了npm上，所以我们只需要执行下面的命令：

``` sh
npm i -S pdfjs-dist
```

## 渲染PDF文档

由于`PDF.js`是使用`canvas`来渲染PDF文档的，所以我们的HTML中无需多余的节点，只需要一个`div`来承载`canvas`节点：

``` html{14}
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <base href="/">
    <title>PDF.js</title>
</head>

<body>
    <div id="pdf-container" class="pdf-container"></div>
</body>

</html>
```

接下来在对应的`index.js`中编写代码渲染事先准备好的PDF文档。
::: tip
`PDF.js`在获取到PDF文档之后会使用`Web Worker`进行渲染操作，这样渲染动作可以和浏览器主线程分离，不会阻塞主线程。
:::
所以在除了导入`PDFJS`对象外，还需要导入`pdfjs.worker.js`文件。

``` js{12,28-36}
// index.js
import PDFJS from 'pdfjs-dist'
// 导入pdfjs.worker.js文件
import 'pdfjs-dist/build/pdf.worker.entry'

// 在页面加载完成后开始渲染PDF。
window.addEventListener('load', () => {
    renderPdf('/static/compressed.pdf')
})

function renderPdf(url) {
    const loadingTask = PDFJS.getDocument(url)
    loadingTask.promise.then(function(pdf) {
        const pdfContainer = document.querySelector('#pdf-container')
        for (let i = 1; i <= pdf.numPages; i++) {
            renderPage(pdfContainer, pdf, i)
        }
    })
}

function renderPage(pdfContainer, pdf, pageIndex) {
    pdf.getPage(pageIndex).then(page => {
        const viewport = page.getViewport({ scale: 1.5, })

        const canvas = document.createElement('canvas')
        pdfContainer.appendChild(canvas)

        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        page.render(renderContext)
    })
}
```

## 渲染含有中文的PDF文档

上面的代码只是一个简单的渲染示例，用这段代码渲染只含有英文的PDF文档没有任何问题，但是如果尝试渲染一个含有中文的PDF文档则会发现`canvas`节点占着页面的位置但内容却是一片空白。打开控制台发现有一行警告信息：
::: warning
Warning: Error during font loading: The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.
:::
这是什么原因引起的呢？首先想到的就是渲染中文字符时有编码问题或者缺少特殊的资源。查查什么是`CMap`文件：
> PDF为了识别所有的字符，给每一个文字都赋予一个唯一的编码，叫CID。
>
> 然后又提供了不同的字体编码与CID的Map文件和CID和Unicode的Map文件。
>
> 一般的PDF文件中文字识别的方法应该是从PDF文件解析出来字体名称和文字编码后，从对应的CMap文件中找到该文字编码对应的CID。然后再根据CID从CID和Unicode的Map文件找到对应的Unicode。
>
> 来源：<https://www.hunterpro.net/archives/293>

原来是缺少了字体管理文件，查阅`PDF.js`文档发现了一个参数`cMapUrl`用来指定`CMap`文件的路径，注意路径需要包含结尾的`/`。但是我们现在没有`CMap`文件，先看看`PDF.js`有没有为我们提供。果然，在`pdfjs-dist`模块目录下发现一个`cmaps`目录，把里面的文件复制到静态资源目录下后，调整`renderPdf`方法：

``` js{4}
function renderPdf(url) {
    const loadingTask = PDFJS.getDocument({
        url,
        cMapUrl: '/static/cmaps/'
    })
    loadingTask.promise.then(function(pdf) {
        const pdfContainer = document.querySelector('#pdf-container')
        for (let i = 1; i <= pdf.numPages; i++) {
            renderPage(pdfContainer, pdf, i)
        }
    })
}
```

保存刷新页面后发现还是一片空白，打开控制台又发现另一行警告信息：
::: warning
Warning: Error during font loading: Unable to load CMap at: /static/cmaps/UniGB-UTF16-H
:::
仔细观察，发现刚才找到的`CMap`文件都是以`.bcmap`结尾的，会不会是格式不正确？再次查阅`PDF.js`文档发现了一个参数`cMapPacked`用来指定提供的`CMap`文件是否已经是`二进制打包`的，想来`bcmap`的意思是`binary CMap`。再次调整`renderPdf`方法：

``` js{5}
function renderPdf(url) {
    const loadingTask = PDFJS.getDocument({
        url,
        cMapUrl: '/static/cmaps/',
        cMapPacked: true
    })
    loadingTask.promise.then(function(pdf) {
        const pdfContainer = document.querySelector('#pdf-container')
        for (let i = 1; i <= pdf.numPages; i++) {
            renderPage(pdfContainer, pdf, i)
        }
    })
}
```

刷新页面发现包含中文的PDF文档也可以正确渲染了。

`PDF.js`还有许多高级用法，一部分在文档中有说明，但是还有一部分藏在源码或示例代码中，需要主动发掘。不得不说，`PDF.js`非常强大！
