export default ({ Vue, options }) => {
  const BASE_CDN_URL = process.env.NODE_ENV === 'production' ? options.baseCdnUrl : ''
  Vue.mixin({
    beforeMount() {
      window.BASE_CDN_URL = BASE_CDN_URL
    },
    methods: {
      $withCdn(path = '') {
        return `${BASE_CDN_URL}${path.startsWith('/') ? '' : '/'}${path}`
      }
    }
  })
}
