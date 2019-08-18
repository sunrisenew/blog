<template>
  <article>
    <h1>
      <center>
        <span>{{$page.title}}</span>
      </center>
    </h1>
    <p>
      <span>创建时间:</span>
      <v-btn text>{{$page.frontmatter.createDate}}</v-btn>
    </p>
    <page-tags :page="$page"></page-tags>
    <Content class="theme-default-content"></Content>
  </article>
</template>

<script>
import PageTags from '@theme/components/PageTags';

export default {
  name: 'Layout',
  components: {
    PageTags
  }
};
</script>

<style lang="stylus" scoped></style>
