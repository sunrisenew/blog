<template>
  <ClientOnly>
    <v-app>
      <v-row class="ma-0" justify="center" dense>
        <v-col cols="10">
          <section class="d-flex flex-column full-height">
            <header class="header">
              <v-row align="center" dense>
                <v-col cols="auto">
                  <v-avatar>
                    <img :src="$withBase('/avatar.jpg')" alt="Avatar" />
                  </v-avatar>
                  <v-btn href="/" text>{{name}}</v-btn>
                  <SearchBox></SearchBox>
                </v-col>
                <v-col cols="auto">
                  <nav v-for="(nav, index) in navs" :key="index">
                    <template v-if="!nav.items">
                      <v-btn v-if="isExternal(nav.link)" :href="nav.link" target="_blank" text>{{nav.text}}</v-btn>
                      <v-btn v-else :to="nav.link" text>{{nav.text}}</v-btn>
                    </template>
                    <v-menu v-else open-on-hover offset-y light>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" :to="nav.link" text>{{nav.text}}</v-btn>
                      </template>
                      <v-list>
                        <v-list-item v-for="item in nav.items" :key="item.text" @click="$router.push(item.link)">
                          <v-list-item-title>{{ item.text }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </nav>
                </v-col>
              </v-row>
            </header>
            <v-divider class="ma-2"></v-divider>
            <main class="main flex-1">
              <component :is="layout"></component>
            </main>
            <footer class="footer">
              <v-row justify="center" align="center" dense>
                <v-col cols="auto">
                  <strong>Copyright &copy; 2018, sunrisenew</strong>
                </v-col>
                <v-col cols="auto">
                  <a href="http://www.beian.miit.gov.cn" target="_blank">陇ICP备17004549号</a>
                </v-col>
                <v-col cols="auto">
                  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62062202000113" target="_blank">
                    <img class="float-left" :src="$withBase('/gov-license.png')" />
                    <span>甘公网安备 62062202000113号</span>
                  </a>
                </v-col>
              </v-row>
            </footer>
          </section>
        </v-col>
      </v-row>
    </v-app>
  </ClientOnly>
</template>

<script>
import SearchBox from '@SearchBox'
import { isExternal } from '@parent-theme/util'

export default {
  name: 'GlobalLayout',
  components: {
    SearchBox
  },
  computed: {
    layout() {
      if (this.$page.path) {
        return this.$frontmatter.layout || 'Layout'
      }
      return 'NotFound'
    },
    name() {
      return this.$themeConfig.name
    },
    navs() {
      return this.$themeConfig.navs || []
    },
    isExternal() {
      return path => isExternal(path)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
