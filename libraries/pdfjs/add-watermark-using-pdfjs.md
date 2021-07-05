---
title: 使用PDF.js在渲染PDF文档时添加水印
tags:
  - 工具库
  - H5
  - JavaScript
  - PDF
---

在H5页面中渲染文档类内容时，总会遇到这样一个需求：可以不可以给文档加上水印用以声明版权、追踪文档或真伪鉴别？本文将介绍如何在渲染时给PDF文档加上水印。
<!-- more -->
::: warning
本文所介绍的方法只在渲染PDF文档时生效，并不修改原PDF文档内容。如果有心之人通过请求直接获取到了原PDF文档，这种方法就无能为力了。所以一定要根据实际情况考虑不同的实现方案。
:::

## 渲染PDF

如何渲染PDF文档已经在[《使用PDF.js在H5页面中渲染PDF文档》](/libraries/pdfjs/render-pdf-in-h5-using-pdfjs.md)一文中讲过，具体内容请点击查看。

## 分析DOM结构

打开审查元素工具，可以清楚地看到`PDF.js`渲染后的生成DOM结构非常简单：

``` html
<div class="pdf-container">
  <canvas height="1188" width="918"></canvas>
  <canvas height="1188" width="918"></canvas>
  <canvas height="1188" width="918"></canvas>
</div>
```

最外面是整个PDF文档的根节点，里面每个`canvas`就是PDF文档的每一页内容。如果要添加水印，就需要在每一个`canvas`同级添加一个`div`元素来绘制水印，然后使用`绝对定位`盖在`canvas`上。最终期望的DOM结构像这样：

``` html
<div class="pdf-container">
  <div class="page-container">
    <canvas height="1188" width="918"></canvas>
    <div class="watermark"></div>
  </div>
  <div class="page-container">
    <canvas height="1188" width="918"></canvas>
    <div class="watermark"></div>
  </div>
  <div class="page-container">
    <canvas height="1188" width="918"></canvas>
    <div class="watermark"></div>
  </div>
</div>
```

## 绘制水印

分析完DOM结构之后，就需要考虑如何画出水印来。

- 图片：直接准备一张透明的水印图片盖上去。这种方式简单粗暴，但是会有很多问题，比如图片尺寸和PDF尺寸不匹配水印会变形、无法方便调整水印的文本/数量/旋转角度等。当然，如果你的水印是一个复杂的图形，用CSS/JS画起来非常麻烦，也可以考虑采用这个方法。
- DOM元素：最简单的方式就是在水印元素下面添加`n`个`div`元素，然后就可以自由地调整各种样式了。
- `canvas`图片：可以使用`canvas`绘制出水印内容，然后转换为`dataURL`做为水印元素的背景图片重复排列。

我选择了生成`canvas`图片的方式来绘制水印。原因是DOM元素的方式太简单，正好之前没有了解过`canvas`相关的API，可以趁此机会简单了解一下。经过一番研究，先实现生成水印`div`元素的方法：

``` js{7,18}
function generateWatermark(text, width, height, rows = 12, columns = 6, angle = -10) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = width / columns
    canvas.height = height / rows

    context.rotate(angle * Math.PI / 180)
    context.font = '16px 微软雅黑'
    context.fillStyle = 'rgba(200, 200, 200, 0.5)'
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(text, 0, 30)

    const watermarkDiv = document.createElement('div')
    watermarkDiv.className = 'watermark'
    watermarkDiv.style.width = width
    watermarkDiv.style.height = height
    watermarkDiv.style.background = `url(${canvas.toDataURL('image/png')}) left top repeat`

    return watermarkDiv
}
```

这个方法根据给定的文本、行数、列数以及旋转角度生成一个带有重复背景图片的水印div元素。

::: tip

- 生成水印的行数、列数和旋转角度这些参数需要根据文本的内容和字体大小调整，以避免水印之间相互遮盖等问题，从而获得最佳的视觉效果。
- 绘制水印的文本字体需要额外注意`版权`问题，文中代码仅用作演示。
:::

## 添加水印

水印绘制好了之后就需要将其添加到DOM节点中，修改之前文章中的`renderPage`方法：

``` js{5-9,14-15}
function renderPage(pdfContainer, pdf, pageIndex) {
    pdf.getPage(pageIndex).then(page => {
        const viewport = page.getViewport({ scale: 1.5, })

        const pageContainer = document.createElement('div')
        pageContainer.classList.add('page-container')
        pageContainer.style.width = `${viewport.width}px`
        pageContainer.style.height = `${viewport.height}px`
        pdfContainer.appendChild(pageContainer)

        const canvas = document.createElement('canvas')
        pageContainer.appendChild(canvas)

        const watermarkDiv = generateWatermark('SUNRISENEW', viewport.width, viewport.height)
        pageContainer.appendChild(watermarkDiv)

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

至此，我们已经为渲染出的每一页PDF添加上了`6 * 12`的水印图案，但仔细观察发现还有一个小问题：`水印图案是盖在PDF内容上面的，而一般的水印都是处于内容下层`。时间有限，留待后续研究。
