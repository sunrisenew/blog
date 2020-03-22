<template>
  <section class="tag">
    <v-row dense>
      <v-col v-for="(page, index) in pages" :key="index" sm="6">
        <page-overview :page="page"></page-overview>
      </v-col>
    </v-row>
    <div class="d-flex justify-center">
      <pagination></pagination>
    </div>
  </section>
</template>

<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'
import PageOverview from '@theme/components/PageOverview'

export default {
  name: 'Tag',
  components: {
    Pagination,
    PageOverview
  },
  computed: {
    pages() {
      return this.$pagination.pages || []
    }
  }
}
</script>

<style lang="stylus" scoped></style>
