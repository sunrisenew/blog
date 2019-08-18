<template>
  <article>
    <h3>
      <a :href="page.path">{{page.title}}</a>
    </h3>
    <page-tags :page="page"></page-tags>
    <p v-if="page.excerpt" v-html="page.excerpt"></p>
  </article>
</template>

<script>
import PageTags from '@theme/components/PageTags';

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
};
</script>

<style lang="stylus" scoped></style>
