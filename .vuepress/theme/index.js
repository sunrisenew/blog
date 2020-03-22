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
        keys: ['created'],
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
      'medium-zoom',
      'reading-progress',
      'reading-time',
      ['@vuepress/search', searchPluginOptions],
      ['@vuepress/blog', blogPluginOptions]
    ],
    extendPageData($page) {
      blogPluginOptions.frontmatters.forEach(({ id, keys = [] }) => {
        const classifications = keys.reduce((result, key) => {
          const classificationValue = $page.frontmatter[key] || []
          if (Array.isArray(classificationValue)) {
            result = result.concat(classificationValue)
          } else {
            result.push(classificationValue)
          }
          return result
        }, [])
        $page[`all${id[0].toUpperCase()}${id.substr(1)}`] = classifications.map(classification => ({
          name: classification,
          path: `/${id}/${classification}`
        }))
      })
      $page['created'] = $page.frontmatter.created
    }
  }
}
