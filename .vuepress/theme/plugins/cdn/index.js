const fs = require('fs')
const { resolve } = require('path')

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-cdn',
  enhanceAppFiles: () => ({
    name: 'cdn-enhance-app',
    content: fs.readFileSync(resolve(__dirname, 'enhanceApp.js'), 'utf-8').replace('${options.baseCdnUrl}', options.baseCdnUrl)
  })
})
