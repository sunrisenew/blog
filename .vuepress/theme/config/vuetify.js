import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import { COLORS, COLORS_DARK } from '@theme/constant'

function install(Vue, options) {
  Vue.use(Vuetify)
  options && (Object.assign(options, {
    vuetify: new Vuetify({
      breakpoint: {
        mobileBreakpoint: 'sm'
      },
      theme: {
        dark: true,
        themes: {
          light: {
            primary: COLORS.PRIMARY
          },
          dark: {
            primary: COLORS_DARK.PRIMARY
          }
        }
      }
    })
  }))
}

export default {
  install
}
