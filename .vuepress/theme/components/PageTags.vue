<template>
  <section>
    <p>
      <span>标签:</span>
      <v-btn v-for="(tag, index) in pageTags" :key="index" :to="tag.path" text>{{tag.name}}</v-btn>
    </p>
  </section>
</template>

<script>
import { getAllClassificationsName } from '@theme/util';

export default {
  name: 'PageTags',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    pageTags() {
      return this.page[getAllClassificationsName('tags')] || [];
    }
  }
};
</script>
<style lang="stylus" scoped></style>
