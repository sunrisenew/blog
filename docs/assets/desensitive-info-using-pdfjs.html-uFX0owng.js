import{_ as i,r as o,o as l,c as u,a as s,b as n,d as a,w as c,f as r,e as t}from"./app-Crn1QATF.js";const d={},k=s("code",null,"姓名、手机号、家庭住址和银行卡号",-1),v=s("code",null,"PDF.js",-1),g=s("div",{class:"hint-container warning"},[s("p",{class:"hint-container-title"},"注意"),s("p",null,"本文所介绍的方法只在渲染PDF文档时生效，并不修改原PDF文档内容。如果有心之人通过请求直接获取到了原PDF文档，这种方法就无能为力了。所以一定要根据实际情况考虑不同的实现方案。")],-1),m=s("h2",{id:"渲染pdf",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#渲染pdf"},[s("span",null,"渲染PDF")])],-1),b=t('<h2 id="如何替换pdf-js渲染时的文本内容" tabindex="-1"><a class="header-anchor" href="#如何替换pdf-js渲染时的文本内容"><span>如何替换PDF.js渲染时的文本内容</span></a></h2><p>想要对文本信息脱敏，首先就要获取到目标文本。但是<code>PDF.js</code>是使用<code>canvas</code>绘制PDF文档的，如何获取并修改渲染的文本内容呢？</p><p>刚开始的思路是截获<code>PDF.js</code>获取到的PDF文档对象，将其中的内容偷梁换柱后再渲染到<code>canvas</code>中。查阅文档后发现<code>PDF.js</code>并没有明确提供修改文本内容的api，只找到了一个位于<code>page</code>对象上的方法<code>getTextContent</code>。这个方法倒是可以获取到解析出的每一个文本元素的字符串及其位置，但是在尝试修改其中的文本字符串之后发现并不会影响<code>canvas</code>中的渲染结果，遂作罢。</p>',3),h={href:"https://mozilla.github.io/pdf.js/web/viewer.html",target:"_blank",rel:"noopener noreferrer"},f=s("code",null,"canvas",-1),x=s("code",null,"canvas",-1),y=t('<p>打开控制台审查官方示例页面中的节点，发现每个页面元素中有2个子元素<code>div.canvasWrapper</code>和<code>div.textLayer</code>。<code>div.canvasWrapper</code>元素自然是承载<code>canvas</code>的包装元素，而点开<code>div.textLayer</code>元素则发现下面有许多<code>span</code>子元素，每个<code>span</code>都负责渲染一个文本块，其内容正是前面提到的可选中的文本内容。</p><p>再查看这些<code>span</code>元素，可以看到每一个都具有行内样式，包括<code>left、top、font-size、font-family、transform</code>这些属性，它们都是通过<code>绝对定位</code>渲染在PDF页面指定位置的，而且点击缩放按钮放大时字体也会跟着放大，缩小时字体也会跟着缩小。CSS样式中还指定了这些元素的<code>color</code>都为<code>transparent</code>，说明这些文本只是用来实现鼠标选择后可以复制，实际看到的还是<code>canvas</code>渲染的内容。将<code>color</code>样式禁用后发现原来的文本上都出现了一层重影，文本层和<code>canvas</code>中的文本位置并不是精准对齐，甚至有些地方渲染出的字体也不完全一致，不过这并不是问题，透明后没有任何影响。</p><h2 id="如何将文本层渲染出来" tabindex="-1"><a class="header-anchor" href="#如何将文本层渲染出来"><span>如何将文本层渲染出来</span></a></h2>',3),j=s("code",null,"PDF.js",-1),D={href:"https://github.com/mozilla/pdf.js/blob/master/web/text_layer_builder.js",target:"_blank",rel:"noopener noreferrer"},P=t(`<div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * The text layer builder provides text selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF&#39;s text. These divs
 * contain text that matches the PDF text they are overlaying. This object
 * also provides a way to highlight text that is being searched for.
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译一下：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Text layer builder为PDF提供了文本选中的功能.
 * 这项功能通过在PDF文本上覆盖一层div元素来实现.
 * 这些div元素包含的文本与他们要覆盖的PDF文本相匹配.
 * 这个对象也为高亮搜索文本提供了一种方式.
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到这里就知道这就是我们要找的实现代码。由于我们不需要复杂的功能，只需要简单地把修改后的文本渲染出来就可以，所以代码改动不多，修改原本的<code>renderPage</code>方法：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> TextLayerBuilder <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;pdfjs-dist/web/pdf_viewer&#39;</span>

<span class="token keyword">function</span> <span class="token function">renderPage</span><span class="token punctuation">(</span><span class="token parameter">pdfContainer<span class="token punctuation">,</span> pdf<span class="token punctuation">,</span> pageIndex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  pdf<span class="token punctuation">.</span><span class="token function">getPage</span><span class="token punctuation">(</span>pageIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">page</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> viewport <span class="token operator">=</span> page<span class="token punctuation">.</span><span class="token function">getViewport</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">scale</span><span class="token operator">:</span> <span class="token number">1.5</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> pageContainer <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    pageContainer<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;page-container&#39;</span><span class="token punctuation">)</span>
    pageContainer<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>viewport<span class="token punctuation">.</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span>
    pageContainer<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>viewport<span class="token punctuation">.</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">\`</span></span>
    pdfContainer<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>pageContainer<span class="token punctuation">)</span>

    page<span class="token punctuation">.</span><span class="token function">getTextContent</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">normalizeWhitespace</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">textContent</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>pageIndex <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> textItems <span class="token operator">=</span> textContent<span class="token punctuation">.</span>items
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>textItems<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          textItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>str <span class="token operator">=</span> <span class="token function">hideSensitiveInfoWithStar</span><span class="token punctuation">(</span>textItems<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>str<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> textLayerDiv <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
      textLayerDiv<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">&#39;text-layer&#39;</span>
      pageContainer<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>textLayerDiv<span class="token punctuation">)</span>

      <span class="token keyword">const</span> textLayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextLayerBuilder</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">textLayerDiv</span><span class="token operator">:</span> textLayerDiv<span class="token punctuation">,</span>
        <span class="token literal-property property">pageIndex</span><span class="token operator">:</span> page<span class="token punctuation">.</span>pageIndex<span class="token punctuation">,</span>
        <span class="token literal-property property">viewport</span><span class="token operator">:</span> viewport
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      textLayer<span class="token punctuation">.</span><span class="token function">setTextContent</span><span class="token punctuation">(</span>textContent<span class="token punctuation">)</span>
      textLayer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">const</span> watermarkDiv <span class="token operator">=</span> <span class="token function">generateWatermark</span><span class="token punctuation">(</span><span class="token string">&#39;SUNRISENEW&#39;</span><span class="token punctuation">,</span> viewport<span class="token punctuation">.</span>width<span class="token punctuation">,</span> viewport<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
      pageContainer<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>watermarkDiv<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>hideSensitiveInfoWithStar</code>方法实现很简单，直接使用<code>正则表达式</code>链式替换文本中的敏感信息为星号（<code>*</code>）：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">hideSensitiveInfoWithStar</span><span class="token punctuation">(</span><span class="token parameter">text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> star <span class="token operator">=</span> <span class="token string">&#39;*&#39;</span>
  <span class="token keyword">return</span> text<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;^&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(.+公司)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> star<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$1<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(Dept:)(.+)\\b(\\^{2,})\\b(.+)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2<span class="token punctuation">,</span> $3<span class="token punctuation">,</span> $4</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>star<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$2<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$3<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$4<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\^{2,}Global\\^ID:)(.+)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>star<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$2<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(Position)(.+)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>star<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$2<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(Cost\\^Center)(.+)\\b(\\^{2,})\\b(Print\\^Date)(.+)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">match<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> $2<span class="token punctuation">,</span> $3<span class="token punctuation">,</span> $4<span class="token punctuation">,</span> $5</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$1<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>star<span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$2<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$3<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>$4<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">.</span><span class="token function">repeat</span><span class="token punctuation">(</span>$5<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\^</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再文本元素添加一些必不可少的样式：</p><div class="language-css line-numbers-mode" data-ext="css" data-title="css"><pre class="language-css"><code><span class="token selector">.page-container span</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> text<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> pre<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> left bottom<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>需要注意：</p><ol><li>脱敏操作仅处理了文本层中的内容，对于绘制在<code>canvas</code>中的文本不会有任何影响。好在需求中要渲染的PDF文档都只有白纸黑字，所以我们直接删除了绘制<code>canvas</code>相关的代码。如果PDF文档中有花里胡哨的背景及图片，不绘制<code>canvas</code>就会导致只有干巴巴的文本层，丢失其余内容。</li><li>水印元素也移动到了文本元素之后再插入到<code>DOM</code>中，这样做也是为了调整二者的层级关系，确保水印覆盖在页面最上方。</li></ol></div>`,10);function w(_,F){const e=o("RouteLink"),p=o("ExternalLinkIcon");return l(),u("div",null,[s("p",null,[n("在前一篇文章中介绍了"),a(e,{to:"/libraries/pdfjs/add-watermark-using-pdfjs.html"},{default:c(()=>[n("《如何使用PDF.js在渲染PDF文档时添加水印》")]),_:1}),n("。但是仅仅有水印还不够，如果是展示一些比较敏感的信息，还需要对指定内容进行脱敏处理，如"),k,n("等等。"),v,n("也支持对渲染的文本内容进行自定义。")]),r(" more "),g,m,s("p",null,[n("如何渲染PDF文档已经在"),a(e,{to:"/libraries/pdfjs/render-pdf-in-h5-using-pdfjs.html"},{default:c(()=>[n("《使用PDF.js在H5页面中渲染PDF文档》")]),_:1}),n("一文中讲过，具体内容请点击查看。")]),b,s("p",null,[n("正当苦苦寻觅之际，我发现"),s("a",h,[n("PDF.js官方示例"),a(p)]),n("中的PDF文本内容竟然是可以选择的，这让我大为震惊！因为我自己渲染的页面中只有一个光秃秃的"),f,n("元素（水印元素暂不考虑），而想要在"),x,n("中选中文本可以说是非常艰难的。")]),y,s("p",null,[n("既然官方示例实现了这个功能，那我们直接去示例源码中找实现方式，肯定是没错的。经过在"),j,n("仓库中一番寻找，终于找到了一个"),s("a",D,[n("TextLayerBuilder"),a(p)]),n("类，看看它的注释：")]),P])}const C=i(d,[["render",w],["__file","desensitive-info-using-pdfjs.html.vue"]]),I=JSON.parse('{"path":"/libraries/pdfjs/desensitive-info-using-pdfjs.html","title":"使用PDF.js对展示的信息进行脱敏处理","lang":"zh-CN","frontmatter":{"title":"使用PDF.js对展示的信息进行脱敏处理","tag":["工具库","H5","JavaScript","PDF"],"description":"在前一篇文章中介绍了。但是仅仅有水印还不够，如果是展示一些比较敏感的信息，还需要对指定内容进行脱敏处理，如姓名、手机号、家庭住址和银行卡号等等。PDF.js也支持对渲染的文本内容进行自定义。 注意 本文所介绍的方法只在渲染PDF文档时生效，并不修改原PDF文档内容。如果有心之人通过请求直接获取到了原PDF文档，这种方法就无能为力了。所以一定要根据实际情...","head":[["meta",{"property":"og:url","content":"https://blog.sunrisenew.cn/libraries/pdfjs/desensitive-info-using-pdfjs.html"}],["meta",{"property":"og:site_name","content":"sunrisenew"}],["meta",{"property":"og:title","content":"使用PDF.js对展示的信息进行脱敏处理"}],["meta",{"property":"og:description","content":"在前一篇文章中介绍了。但是仅仅有水印还不够，如果是展示一些比较敏感的信息，还需要对指定内容进行脱敏处理，如姓名、手机号、家庭住址和银行卡号等等。PDF.js也支持对渲染的文本内容进行自定义。 注意 本文所介绍的方法只在渲染PDF文档时生效，并不修改原PDF文档内容。如果有心之人通过请求直接获取到了原PDF文档，这种方法就无能为力了。所以一定要根据实际情..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"sunrisenew"}],["meta",{"property":"article:tag","content":"工具库"}],["meta",{"property":"article:tag","content":"H5"}],["meta",{"property":"article:tag","content":"JavaScript"}],["meta",{"property":"article:tag","content":"PDF"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用PDF.js对展示的信息进行脱敏处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"sunrisenew\\",\\"url\\":\\"https://blog.sunrisenew.cn\\",\\"email\\":\\"sunrisenew@foxmail.com\\"}]}"]]},"headers":[{"level":2,"title":"渲染PDF","slug":"渲染pdf","link":"#渲染pdf","children":[]},{"level":2,"title":"如何替换PDF.js渲染时的文本内容","slug":"如何替换pdf-js渲染时的文本内容","link":"#如何替换pdf-js渲染时的文本内容","children":[]},{"level":2,"title":"如何将文本层渲染出来","slug":"如何将文本层渲染出来","link":"#如何将文本层渲染出来","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":5.17,"words":1551},"filePathRelative":"libraries/pdfjs/desensitive-info-using-pdfjs.md","excerpt":"<p>在前一篇文章中介绍了<a href=\\"/libraries/pdfjs/add-watermark-using-pdfjs.html\\" target=\\"_blank\\">《如何使用PDF.js在渲染PDF文档时添加水印》</a>。但是仅仅有水印还不够，如果是展示一些比较敏感的信息，还需要对指定内容进行脱敏处理，如<code>姓名、手机号、家庭住址和银行卡号</code>等等。<code>PDF.js</code>也支持对渲染的文本内容进行自定义。</p>\\n","autoDesc":true}');export{C as comp,I as data};