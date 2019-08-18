module.exports = (themeConfig, context) => {
  const searchPluginOptions = {
    searchMaxSuggestions: 10
  };

  const blogPluginOptions = {
    frontmatters: [
      {
        id: 'archives',
        keys: ['archive'],
        path: '/archives/',
        layout: 'Archives',
        itemLayout: 'Archive',
        frontmatter: { title: '归档' },
        pagination: {
          sorter: (prevPage, nextPage) => {
            let prevValue = prevPage.frontmatter.createDate;
            let nextValue = nextPage.frontmatter.createDate;
            return prevValue === nextValue ? 0 : (prevValue > nextValue ? 1 : -1);
          }
        }
      },
      {
        id: 'tags',
        keys: ['tag', 'tags'],
        path: '/tags/',
        layout: 'Tags',
        itemLayout: 'Tag',
        frontmatter: { title: '标签' }
      }
    ]
  };

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
      let pagePath = $page.path || '';
      blogPluginOptions.frontmatters.forEach(({ id, path, keys = [], itemLayout }) => {
        let classifications = keys.reduce((result, key) => {
          let classificationValue = $page.frontmatter[key] || [];
          if (Array.isArray(classificationValue)) {
            result = result.concat(classificationValue);
          } else {
            result.push(classificationValue);
          }
          return result;
        }, []);
        $page[`all${id[0].toUpperCase()}${id.substr(1)}`] = classifications.map(classification => ({
          name: classification,
          path: `/${id}/${classification}`
        }));

        if (new RegExp(`^${path}.+/$`, 'g').test(pagePath)) {
          $page.frontmatter.layout = itemLayout;
        }
      });
    }
  };
};
