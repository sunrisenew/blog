module.exports = {
  dest: 'docs',
  evergreen: true,
  title: 'SunRiseNew',
  description: 'SunRiseNew Blog',
  head: [
    ['link', { rel: 'icon', href: '/avatar.jpg' }],
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
    name: 'SunRiseNew',
    navs: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
      { text: 'GitHub', link: 'https://github.com/sunrisenew' }
    ],
    lastUpdated: true
  }
}
