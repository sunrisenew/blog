<template>
  <article class="article">
    <h1 class="text-center">{{$page.title}}</h1>
    <div class="d-flex justify-space-between flex-wrap">
      <page-tags :page="$page"></page-tags>
      <div class="d-flex align-center flex-wrap">
        <div v-if="$page.created" class="d-flex align-center">
          <span>创建时间:</span>
          <v-btn :to="`/archives/${$page.archive}`" text small>{{$page.created}}</v-btn>
        </div>
        <div v-if="$page.lastUpdated" class="d-flex align-center">
          <span>更新时间:</span>
          <v-btn text small>{{$page.lastUpdated}}</v-btn>
        </div>
      </div>
    </div>
    <Content class="theme-default-content"></Content>
  </article>
</template>

<script>
import PageTags from '@theme/components/PageTags'

export default {
  name: 'Layout',
  components: {
    PageTags
  }
}
</script>

<style lang="stylus" scoped>
.article
  .theme-default-content
    padding: 2rem 0
</style>
