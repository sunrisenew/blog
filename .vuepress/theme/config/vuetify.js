import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

function install(Vue, options) {
  Vue.use(Vuetify)
  options && (Object.assign(options, {
    vuetify: new Vuetify({
      theme: {
        disable: true
      }
    })
  }))
}

export default {
  install
}
