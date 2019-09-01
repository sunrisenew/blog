<template>
  <section class="archives">
    <v-timeline v-if="notEmpty">
      <v-timeline-item v-for="(archive, archiveIndex) in archives" :key="archiveIndex" small>
        <template v-slot:opposite>
          <h3>
            <a :href="archive.path">{{archive.name}}</a>
          </h3>
        </template>
        <page-overview v-for="(page, pageIndex) in archive.pages" :key="pageIndex" :page="page"></page-overview>
      </v-timeline-item>
    </v-timeline>
  </section>
</template>

<script>
import PageOverview from '@theme/components/PageOverview';

import { negativeSorter } from '@theme/util';

export default {
  name: 'Archives',
  components: {
    PageOverview
  },
  computed: {
    archives() {
      return (this.$frontmatterKey.list || []).sort((prev, next) => negativeSorter(prev.name, next.name));
    },
    notEmpty() {
      return this.archives && this.archives.length > 0;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
