module.exports = {
  dest: 'docs',
  evergreen: true,
  title: 'sunrisenew',
  description: 'sunrisenew blog',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/images/avatar.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' }]
  ],
  plugins: [
    ['serve', {
      staticOptions: {
        dotfiles: 'allow'
      },
      notFoundPath: ''
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    name: 'sunrisenew',
    navs: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
      { text: 'GitHub', link: 'https://github.com/sunrisenew' }
    ]
  },
  chainWebpack: (config, isServer) => {
    // Add CDN jsDelivr.
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath('https://cdn.jsdelivr.net/gh/sunrisenew/blog/docs/')
    }
  }
}
