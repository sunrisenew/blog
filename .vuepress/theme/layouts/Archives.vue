<template>
  <section class="archives">
    <v-timeline v-if="notEmpty" :dense="$vuetify.breakpoint.mobile">
      <v-timeline-item v-for="(archive, archiveIndex) in archives" :key="archiveIndex" small>
        <template v-slot:opposite>
          <h3>
            <a :href="archive.path">{{archive.name}}</a>
          </h3>
        </template>
        <page-overview v-for="(page, pageIndex) in sortPages(archive.pages)" :key="pageIndex" :page="page"></page-overview>
      </v-timeline-item>
    </v-timeline>
  </section>
</template>

<script>
import PageOverview from '@theme/components/PageOverview'
import { negativeSort } from '@theme/util'

export default {
  name: 'Archives',
  components: {
    PageOverview
  },
  computed: {
    archives() {
      return (this.$frontmatterKey.list || []).sort((prev, next) => negativeSort(prev.name, next.name))
    },
    notEmpty() {
      return this.archives && this.archives.length > 0
    }
  },
  methods: {
    sortPages(pages) {
      pages.sort((prev, next) => negativeSort(prev.created, next.created))
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped></style>
