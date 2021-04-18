<template>
  <v-card class="page-overview my-6" raised shaped>
    <v-card-title primary-title>
      <a :href="page.path">
        <h3>{{page.title}}</h3>
      </a>
    </v-card-title>
    <div v-if="page.created" class="mx-4">
      <span>创建时间:</span>
      <v-btn :to="`/archives/${page.archive}`" text small>{{$formatDate(page.created)}}</v-btn>
    </div>
    <page-tags :page="page"></page-tags>
    <v-card-text v-if="page.excerpt">
      <p v-html="page.excerpt"></p>
    </v-card-text>
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
