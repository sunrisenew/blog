const {
  BASE_CDN_DOMAIN,
  BASE_CDN_URL
} = require('./theme/constant')

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
    ['link', { rel: 'icon', href: `${process.env.NODE_ENV === 'production' ? BASE_CDN_URL : ''}/images/avatar.png` }],
    ['link', { rel: 'stylesheet', href: `${BASE_CDN_DOMAIN}/npm/@mdi/font@latest/css/materialdesignicons.min.css` }]
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
    sidebar: 'auto',
    navs: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
      {
        text: '更多',
        items: [
          { text: '常用工具', link: '/tools' }
        ]
      },
      { text: '关于', link: '/about' }
    ],
    profile: {
      email: 'sunrisenew@foxmail.com',
      githubProfile: 'https://github.com/sunrisenew'
    }
  },
  chainWebpack: (config, isServer) => {
    // Add CDN jsDelivr.
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath(`${BASE_CDN_URL}/`)
    }
  }
}
