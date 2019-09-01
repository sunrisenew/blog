<template>
  <section class="archive">
    <v-row>
      <v-col>
        <p>
          <center>
            <h3>{{$currentArchives.key}}</h3>
          </center>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(page, index) in pages" :key="index" cols="6">
        <page-overview :page="page"></page-overview>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import PageOverview from '@theme/components/PageOverview';

export default {
  name: 'Archive',
  components: {
    PageOverview
  },
  computed: {
    pages() {
      return this.$pagination.pages || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
