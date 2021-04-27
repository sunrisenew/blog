<template>
  <v-card class="page-overview my-6 bg-transparent" raised>
    <v-card-title primary-title>
      <h3>
        <router-link :to="page.path">{{page.title}}</router-link>
      </h3>
    </v-card-title>
    <div v-if="page.created" class="mx-4">
      <span>创建时间:</span>
      <v-btn :to="`/archives/${page.archive}`" text small>{{$formatDate(page.created)}}</v-btn>
    </div>
    <page-tags :page="page"></page-tags>
    <div v-if="page.excerpt" class="theme-default-content py-4" v-html="page.excerpt"></div>
  </v-card>
</template>

<script>
import PageTags from '@theme/components/PageTags'

export default {
  name: 'PageOverview',
  components: {
    PageTags
  },
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped></style>
