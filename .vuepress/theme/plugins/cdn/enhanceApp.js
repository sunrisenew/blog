export default ({ Vue, options }) => {
  window.BASE_CDN_URL = process.env.NODE_ENV === 'production' ? options.baseCdnUrl : ''
  Vue.mixin({
    methods: {
      $withCdn(path = '') {
        return `${window.BASE_CDN_URL}${path.startsWith('/') ? '' : '/'}${path}`
      }
    }
  })
}
