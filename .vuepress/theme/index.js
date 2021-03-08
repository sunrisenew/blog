const {
  BASE_CDN_URL
} = require('./constant')
const {
  dateOptions
} = require('./util')

module.exports = (themeConfig, context) => {
  const searchPluginOptions = {
    searchMaxSuggestions: 10
  }

  const paginationOptions = {
    prevText: '上一页',
    nextText: '下一页',
    sorter: (prevPage, nextPage) => {
      const prevValue = prevPage.created
      const nextValue = nextPage.created
      return prevValue === nextValue ? 0 : (prevValue > nextValue ? 1 : -1)
    }
  }

  const blogPluginOptions = {
    frontmatters: [
      {
        id: 'archives',
        keys: ['archive'],
        path: '/archives/',
        layout: 'Archives',
        scopeLayout: 'Archive',
        frontmatter: { title: '归档' },
        pagination: paginationOptions
      },
      {
        id: 'tags',
        keys: ['tag', 'tags'],
        path: '/tags/',
        layout: 'Tags',
        scopeLayout: 'Tag',
        frontmatter: { title: '标签' },
        pagination: paginationOptions
      }
    ]
  }

  return {
    extend: '@vuepress/theme-default',
    globalLayout: 'GlobalLayout.vue',
    plugins: [
      [require('./plugins/cdn'), {
        baseCdnUrl: BASE_CDN_URL
      }],
      [require('./plugins/created'), {
        dateOptions
      }],
      [require('./plugins/classification'), {
        blogPluginOptions
      }],
      'medium-zoom',
      'reading-progress',
      'reading-time',
      ['@vuepress/search', searchPluginOptions],
      ['@vuepress/last-updated', {
        dateOptions
      }]
    ]
  }
}
