<template>
  <section class="tags">
    <v-btn v-for="(tag, index) in tags" :key="index" :to="tag.path" text>{{tag.name}}</v-btn>
  </section>
</template>

<script>

export default {
  name: 'Tags',
  computed: {
    tags() {
      return this.$frontmatterKey.list || [];
    }
  }
};
</script>

<style lang="stylus" scoped></style>
