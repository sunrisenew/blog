export default ({ Vue, options }) => {
  Vue.mixin({
    methods: {
      $withCdn(path) {
        return `${options.baseCdnUrl}${path.startsWith('/') ? '' : '/'}${path}`
      }
    }
  })
}
