<template>
  <ClientOnly>
    <v-app class="application" :class="dark ? 'dark' : 'light'" id="application">
      <canvas v-show="dark" class="background full-size"></canvas>
      <script :src="$withCdn('/scripts/background.js')" defer></script>
      <div v-if="!unveiled" class="curtain d-flex justify-center align-center full-size">
        <div class="d-flex flex-column justify-center align-center px-16 py-8 elevation-12 rounded-xl">
          <h1 class="text-sm-h1 text-h6 text-uppercase">{{name}}</h1>
          <v-btn color="primary" x-large plain text @click="unveil()">开始</v-btn>
        </div>
      </div>
      <v-row v-else class="foreground ma-0" justify="center" dense>
        <v-col cols="10">
          <section class="d-flex flex-column py-2 full-height">
            <header class="header">
              <v-row align="center" dense>
                <v-col cols="auto">
                  <v-menu :close-on-content-click="false" transition="scale-transition" offset-y open-on-click>
                    <template #activator="{ on }">
                      <v-avatar class="cursor-pointer" v-on="on">
                        <img :src="$withCdn('/images/avatar.png')" alt="Avatar" />
                      </v-avatar>
                    </template>
                    <profile :main-image="$withCdn('/images/avatar.png')" :email="profile.email" :github-profile="profile.githubProfile" :wechat-official-account-code="$withCdn('/images/wechat-official-account.png')"></profile>
                  </v-menu>
                  <v-btn href="/" text>{{name}}</v-btn>
                </v-col>
                <v-col cols="auto">
                  <nav v-for="(nav, index) in navs" :key="index">
                    <template v-if="!nav.items">
                      <v-btn v-if="isExternal(nav.link)" :href="nav.link" target="_blank" text>{{nav.text}}</v-btn>
                      <v-btn v-else :to="nav.link" text>{{nav.text}}</v-btn>
                    </template>
                    <v-menu v-else offset-y open-on-hover>
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
                <v-col class="ml-auto" cols="auto">
                  <v-dialog v-if="mobile" v-model="searchDialog" content-class="pa-2 bg-reading" fullscreen>
                    <template #activator="{ on, attrs }">
                      <v-btn v-on="on" v-bind="attrs" icon>
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                    </template>
                    <div class="d-flex align-center">
                      <search-box class="flex-grow-1"></search-box>
                      <v-btn class="ml-2" icon @click="closeSearchDialog()">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </v-dialog>
                  <search-box v-else></search-box>
                  <v-btn icon @click="$vuetify.theme.dark = !dark">
                    <v-icon>mdi-theme-light-dark</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </header>
            <v-divider class="my-2"></v-divider>
            <main class="main flex-grow-1">
              <component :is="layout"></component>
            </main>
            <footer class="footer">
              <v-row justify="center" align="center" dense>
                <v-col cols="auto">
                  <strong>Copyright &copy; {{currentYear}}, {{name}}</strong>
                </v-col>
                <v-col cols="auto">
                  <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">陇ICP备17004549号</a>
                </v-col>
                <v-col cols="auto">
                  <a class="d-flex align-center" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62062202000113" target="_blank" rel="noopener noreferrer">
                    <img :src="$withCdn('/images/gov-license.png')" alt="" />
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
import dayjs from '@theme/config/dayjs'
import Profile from '@theme/components/Profile'

export default {
  name: 'GlobalLayout',
  components: {
    SearchBox,
    Profile
  },
  data() {
    return {
      unveiled: false,
      searchDialog: false
    }
  },
  computed: {
    layout() {
      if (this.$page.path) {
        return this.$frontmatter.layout || 'Layout'
      }
      return 'NotFound'
    },
    profile() {
      return this.$themeConfig.profile || {}
    },
    name() {
      return this.$themeConfig.name
    },
    navs() {
      return this.$themeConfig.navs || []
    },
    dark() {
      // ISSUE Why the this.$vuetify.theme is undefined during compiling the client files?
      return (this.$vuetify.theme || {}).dark
    },
    mobile() {
      // ISSUE Why the this.$vuetify.breakpoint is undefined during compiling the client files?
      return (this.$vuetify.breakpoint || {}).mobile
    },
    currentYear() {
      return dayjs().year()
    }
  },
  watch: {
    unveiled(newValue) {
      this.$vuetify.theme.dark = !newValue
    }
  },
  created() {
    this.unveiled = this.$route.path !== '/'
  },
  methods: {
    isExternal,
    unveil() {
      this.unveiled = true
    },
    closeSearchDialog() {
      this.searchDialog = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.application
  position: relative
  z-index: 0

  .background
    position: absolute
    z-index: -1

  .curtain
    user-select: none

  .foreground
    background: none
</style>
