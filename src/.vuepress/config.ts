import { defineUserConfig } from 'vuepress'
import { zhNavbar } from './navbar'
import theme from './theme'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'sunrisenew',
  description: 'sunrisenew blog',
  dest: 'docs',
  alias: {
    '@images': 'images'
  },
  theme: theme({
    hostname: 'https://blog.sunrisenew.cn',
    author: {
      name: 'sunrisenew',
      url: 'https://blog.sunrisenew.cn',
      email: 'sunrisenew@foxmail.com'
    },
    iconAssets: 'iconify',
    favicon: '/images/avatar.png',
    logo: '/images/avatar.png',
    repo: 'sunrisenew/blog',
    docsDir: 'docs',
    navbar: zhNavbar,
    sidebar: 'heading',
    editLink: false,
    displayFooter: true,
    footer: `
      <a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">陇ICP备17004549号</a>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62062202000113"
        target="_blank"
        rel="noopener noreferrer"
        style="display: flex;align-items: center;">
        <img src="/images/gov-license.png" alt="" />
        <span>甘公网安备 62062202000113号</span>
      </a>
    `,
    copyright: 'Copyright © 2020-present sunrisenew',
    print: false,
    hotReload: true,
    blog: {
      name: 'sunrisenew',
      avatar: '/images/avatar.png',
      roundAvatar: true,
      description: 'sunrisenew blog',
      intro: '/intro.html',
      medias: {
        Email: 'mailto:sunrisenew@foxmail.com',
        GitHub: 'https://github.com/sunrisenew',
        Gitlab: 'https://gitlab.com/sunrisenew',
        Gitee: 'https://gitee.com/sunrisenew'
      }
    },
    plugins: {
      blog: {
        excerptLength: 0,
        article: '/articles/',
        category: 'categories/',
        categoryItem: '/categories/:name/',
        tag: '/tags/',
        tagItem: '/tags/:name/',
        star: '/stars/',
        timeline: '/timeline/'
      },
      mdEnhance: {
        vPre: true,
        align: true,
        attrs: true,
        codetabs: true,
        demo: true,
        figure: true,
        imgLazyload: true,
        imgSize: true,
        include: true,
        mark: true,
        sub: true,
        sup: true,
        tabs: true,
        playground: {
          presets: ['ts', 'vue']
        },
        stylize: [
          {
            matcher: 'Recommended',
            replacer: ({ tag }) => {
              if (tag === 'em')
                return {
                  tag: 'Badge',
                  attrs: { type: 'tip' },
                  content: 'Recommended'
                }
            }
          }
        ]
      },
      comment: false,
      prismjs: {
        light: 'tomorrow'
      }
    }
  })
})
