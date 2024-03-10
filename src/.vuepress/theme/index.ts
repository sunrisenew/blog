import { getDirname, path } from '@vuepress/utils'
import { Theme } from 'vuepress'
import { ThemeOptions, hopeTheme } from 'vuepress-theme-hope'

const __dirname = getDirname(import.meta.url)

export default (options: ThemeOptions | Record<string, unknown>): Theme => ({
  name: '@sunrisenew/vuepress-theme-blog',
  extends: hopeTheme(options, { custom: true }),
  alias: {
    '@theme-hope/modules/blog/components/BlogHero': path.resolve(__dirname, 'components/BlogHero.vue')
  }
})
