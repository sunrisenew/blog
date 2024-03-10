---
title: 屏幕坏点测试
tag:
  - 工具
  - PC
  - 屏幕
---

1. 在桌面新建`index.html`文件，粘贴下面的代码并保存。
2. 使用浏览器打开`index.html`，按`F11`进入全屏。
3. 点击鼠标切换不同的颜色，然后仔细观察屏幕上是否有坏点、暗点或亮点。
4. 结束后再次按`F11`退出全屏。

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>屏幕坏点测试</title>
    <style>
        body {
            width: 100vw;
            height: 100vh;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

    </style>
</head>

<body>
    <script>
        const colors = ['black', 'white', 'gray', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink']

        let colorIndex = 0
        const body = document.querySelector('body')
        body.style.backgroundColor = colors[colorIndex]
        body.addEventListener('click', () => {
            colorIndex++
            body.style.backgroundColor = colors[colorIndex % colors.length]
        })
    </script>
</body>

</html>
```
