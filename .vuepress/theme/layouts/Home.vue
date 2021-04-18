<template>
  <section class="home">
    <page-overview v-for="(recentPage, pageIndex) in recentPages" :key="pageIndex" :page="recentPage"></page-overview>
  </section>
</template>

<script>
import PageOverview from '@theme/components/PageOverview'
import { negativeSort } from '@theme/util'

export default {
  name: 'Home',
  components: {
    PageOverview
  },
  computed: {
    recentPages() {
      const pages = this.$site.pages.filter(page => page.archive)
      pages.sort((prev, next) => negativeSort(prev.created, next.created))
      return pages.slice(0, this.$themeConfig.recentPagesCount || 6)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
