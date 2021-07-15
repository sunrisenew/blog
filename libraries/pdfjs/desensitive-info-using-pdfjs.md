---
title: 使用PDF.js对展示信息的进行脱敏处理
tags:
  - 工具库
  - H5
  - JavaScript
  - PDF
---

在前一篇文章中介绍了[《如何使用PDF.js在渲染PDF文档时添加水印》](/libraries/pdfjs/add-watermark-using-pdfjs.md)。但是仅仅有水印还不够，如果是展示一些比较敏感的信息，还需要对指定内容进行脱敏处理，如`姓名、手机号、家庭住址和银行卡号`等等。`PDF.js`也支持对渲染的文本内容进行自定义。
<!-- more -->
::: warning
本文所介绍的方法只在渲染PDF文档时生效，并不修改原PDF文档内容。如果有心之人通过请求直接获取到了原PDF文档，这种方法就无能为力了。所以一定要根据实际情况考虑不同的实现方案。
:::

## 渲染PDF

如何渲染PDF文档已经在[《使用PDF.js在H5页面中渲染PDF文档》](/libraries/pdfjs/render-pdf-in-h5-using-pdfjs.md)一文中讲过，具体内容请点击查看。

## 如何替换PDF.js渲染时的文本内容

想要对文本信息脱敏，首先就要获取到目标文本。但是`PDF.js`是使用`canvas`绘制PDF文档的，如何获取并修改渲染的文本内容呢？

刚开始的思路是截获`PDF.js`获取到的PDF文档对象，将其中的内容偷梁换柱后再渲染到`canvas`中。查阅文档后发现`PDF.js`并没有明确提供修改文本内容的api，只找到了一个位于`page`对象上的方法`getTextContent`。这个方法倒是可以获取到解析出的每一个文本元素的字符串及其位置，但是在尝试修改其中的文本字符串之后发现并不会影响`canvas`中的渲染结果，遂作罢。

正当苦苦寻觅之际，我发现[PDF.js官方示例](https://mozilla.github.io/pdf.js/web/viewer.html)中的PDF文本内容竟然是可以选择的，这让我大为震惊！因为我自己渲染的页面中只有一个光秃秃的`canvas`元素（水印元素暂不考虑），而想要在`canvas`中选中文本可以说是非常艰难的。

打开控制台审查官方示例页面中的节点，发现每个页面元素中有2个子元素`div.canvasWrapper`和`div.textLayer`。`div.canvasWrapper`元素自然是承载`canvas`的包装元素，而点开`div.textLayer`元素则发现下面有许多`span`子元素，每个`span`都负责渲染一个文本块，其内容正是前面提到的可选中的文本内容。

再查看这些`span`元素，可以看到每一个都具有行内样式，包括`left、top、font-size、font-family、transform`这些属性，它们都是通过`绝对定位`渲染在PDF页面指定位置的，而且点击缩放按钮放大时字体也会跟着放大，缩小时字体也会跟着缩小。CSS样式中还指定了这些元素的`color`都为`transparent`，说明这些文本只是用来实现鼠标选择后可以复制，实际看到的还是`canvas`渲染的内容。将`color`样式禁用后发现原来的文本上都出现了一层重影，文本层和`canvas`中的文本位置并不是精准对齐，甚至有些地方渲染出的字体也不完全一致，不过这并不是问题，透明后没有任何影响。

## 如何将文本层渲染出来

既然官方示例实现了这个功能，那我们直接去示例源码中找实现方式，肯定是没错的。经过在`PDF.js`仓库中一番寻找，终于找到了一个[TextLayerBuilder](https://github.com/mozilla/pdf.js/blob/master/web/text_layer_builder.js)类，看看它的注释：

``` js
/**
 * The text layer builder provides text selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF's text. These divs
 * contain text that matches the PDF text they are overlaying. This object
 * also provides a way to highlight text that is being searched for.
 */
```

翻译一下：

``` js
/**
 * Text layer builder为PDF提供了文本选中的功能.
 * 这项功能通过在PDF文本上覆盖一层div元素来实现.
 * 这些div元素包含的文本与他们要覆盖的PDF文本相匹配.
 * 这个对象也为高亮搜索文本提供了一种方式.
 */
```

看到这里就知道这就是我们要找的实现代码。由于我们不需要复杂的功能，只需要简单地把修改后的文本渲染出来就可以，所以代码改动不多，修改原本的`renderPage`方法：

``` js{17,24-31}
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'

function renderPage(pdfContainer, pdf, pageIndex) {
  pdf.getPage(pageIndex).then(page => {
    const viewport = page.getViewport({ scale: 1.5, })

    const pageContainer = document.createElement('div')
    pageContainer.classList.add('page-container')
    pageContainer.style.width = `${viewport.width}px`
    pageContainer.style.height = `${viewport.height}px`
    pdfContainer.appendChild(pageContainer)

    page.getTextContent({ normalizeWhitespace: true }).then(textContent => {
      if (pageIndex === 1) {
        const textItems = textContent.items
        for (let j = 0; j < (Math.max(textItems.length, 20)); j++) {
          textItems[j].str = hideSensitiveInfoWithStar(textItems[j].str)
        }
      }
      const textLayerDiv = document.createElement('div')
      textLayerDiv.className = 'text-layer'
      pageContainer.appendChild(textLayerDiv)

      const textLayer = new TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        pageIndex: page.pageIndex,
        viewport: viewport
      })

      textLayer.setTextContent(textContent)
      textLayer.render()

      const watermarkDiv = generateWatermark('SUNRISENEW', viewport.width, viewport.height)
      pageContainer.appendChild(watermarkDiv)
    })
  })
}
```

其中`hideSensitiveInfoWithStar`方法实现很简单，直接使用`正则表达式`链式替换文本中的敏感信息为星号（`*`）：

``` js
function hideSensitiveInfoWithStar(text) {
  const star = '*'
  return text.replace(/\s/g, '^')
    .replace(/(.+公司)/gi, (match, $1) => star.repeat($1.length))
    .replace(/(Dept:)(.+)\b(\^{2,})\b(.+)/gi, (match, $1, $2, $3, $4) => {
      return `${$1}${star.repeat($2.length)}${$3}${$4}`
    })
    .replace(/(\^{2,}Global\^ID:)(.+)/gi, (match, $1, $2) => {
      return `${$1}${star.repeat($2.length)}`
    })
    .replace(/(Position)(.+)/gi, (match, $1, $2) => {
      return `${$1}${star.repeat($2.length)}`
    })
    .replace(/(Cost\^Center)(.+)\b(\^{2,})\b(Print\^Date)(.+)/gi, (match, $1, $2, $3, $4, $5) => {
      return `${$1}${star.repeat($2.length)}${$3}${$4}${'*'.repeat($5.length)}`
    })
    .replace(/\^/g, ' ')
}
```

再文本元素添加一些必不可少的样式：

``` css
.page-container span {
  position: absolute;
  cursor: text;
  white-space: pre;
  transform-origin: left bottom;
}
```

::: tip
需要注意：

1. 脱敏操作仅处理了文本层中的内容，对于绘制在`canvas`中的文本不会有任何影响。好在需求中要渲染的PDF文档都只有白纸黑字，所以我们直接删除了绘制`canvas`相关的代码。如果PDF文档中有花里胡哨的背景及图片，不绘制`canvas`就会导致只有干巴巴的文本层，丢失其余内容。
2. 水印元素也移动到了文本元素之后再插入到`DOM`中，这样做也是为了调整二者的层级关系，确保水印覆盖在页面最上方。
:::
