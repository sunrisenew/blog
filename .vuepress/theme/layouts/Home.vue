<template>
  <section class="home">
    <v-row align="center">
      <v-col v-for="(feature, index) in features" :key="index" cols sm>
        <v-card>
          <v-card-title primary-title>{{feature.title}}</v-card-title>
          <v-card-text>{{feature.description}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <article>
      <Content class="theme-default-content"></Content>
    </article>
  </section>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    features() {
      return this.$frontmatter.features || [];
    }
  },
};
</script>

<style lang="stylus" scoped></style>
