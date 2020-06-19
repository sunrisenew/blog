<template>
  <article>
    <a :href="page.path">
      <h3 class="my-2">{{page.title}}</h3>
    </a>
    <div v-if="page.created">
      <span>创建时间:</span>
      <v-btn :to="`/archives/${page.archive}`" text small>{{page.created}}</v-btn>
    </div>
    <page-tags :page="page"></page-tags>
    <p v-if="page.excerpt" v-html="page.excerpt"></p>
  </article>
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
