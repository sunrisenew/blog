const fs = require('fs')
const { resolve } = require('path')

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-cdn',
  enhanceAppFiles: () => {
    let content = fs.readFileSync(resolve(__dirname, 'enhanceApp.js'), 'utf-8')
    Object.entries(options).forEach(([key, value]) => {
      const regexp = new RegExp(`options\\.${key}`, 'g')
      content = content.replace(regexp, `'${value}'`)
    })

    return {
      content,
      name: 'cdn-enhance-app'
    }
  }
})
