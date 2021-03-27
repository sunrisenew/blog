const dayjs = require('../../config/dayjs')
const {
  YEAR_MONTH_FORMAT
} = require('../../constant')
const {
  buildAllClassificationsName
} = require('../../util')

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-classification',
  plugins: [
    ['@vuepress/blog', options.blogPluginOptions]
  ],
  extendPageData($page) {
    const {
      blogPluginOptions = {
        frontmatters: []
      },
      archiveFormat = YEAR_MONTH_FORMAT
    } = options
    blogPluginOptions.frontmatters.forEach(({ id, keys = [] }) => {
      const classifications = keys.reduce((result, key) => {
        const classificationValue = $page[key] || $page.frontmatter[key] || []
        if (Array.isArray(classificationValue)) {
          result = result.concat(classificationValue)
        } else {
          result.push(classificationValue)
        }
        return result
      }, [])
      $page[buildAllClassificationsName(id)] = classifications.map(classification => ({
        name: classification,
        path: `/${id}/${classification}`
      }))
    })
    if ($page.path !== '/' && $page.created) {
      $page.archive = $page.frontmatter.archive = dayjs($page.created).format(archiveFormat)
    }
  }
})
