import dayjs from '@theme/config/dayjs'
import '@theme/config/prism'
import Vuetify from '@theme/config/vuetify'
import { DATETIME_FORMAT } from '@theme/constant'

export default ({ Vue, options }) => {
  Vue.use(Vuetify, options)
  Vue.mixin({
    methods: {
      $formatDate(timestamp, format = DATETIME_FORMAT) {
        return dayjs(timestamp).format(format)
      }
    }
  })
}
