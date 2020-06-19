<template>
  <section class="tags d-flex justify-center flex-wrap">
    <v-btn v-for="(tag, index) in tags" :key="index" :to="tag.path" text rounded>{{`${tag.name}(${tag.pages.length})`}}</v-btn>
  </section>
</template>

<script>
export default {
  name: 'Tags',
  computed: {
    tags() {
      return this.$frontmatterKey.list || []
    }
  }
}
</script>

<style lang="stylus" scoped></style>
