import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  { text: '时间轴', icon: 'mdi:timeline', link: '/timeline/' },
  {
    text: '更多',
    icon: 'mdi:more',
    prefix: '/',
    children: [
      {
        text: '工具',
        icon: 'mdi:tools',
        link: 'tools/'
      }
    ]
  },
  { text: '关于', icon: 'mdi:about', link: '/about' }
])
