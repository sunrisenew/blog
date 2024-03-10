import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  { text: '时间轴', icon: 'time', link: '/timeline' },
  {
    text: '更多',
    icon: 'more',
    prefix: '/',
    children: [
      {
        text: '工具',
        icon: 'tool',
        link: 'tools'
      }
    ]
  },
  { text: '关于', icon: 'info', link: '/about' }
])
