<template>
  <blog-hero>
    <template #heroBg>
      <div ref="backgroundRef" class="background-wrapper">
        <canvas class="background full-size"></canvas>
      </div>
    </template>
  </blog-hero>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BlogHero from 'vuepress-theme-hope/client/modules/blog/components/BlogHero'

const backgroundRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const scriptEle = document.createElement('script')
  scriptEle.src = '/scripts/background.js'
  scriptEle.defer = true
  backgroundRef.value?.append(scriptEle)
})
</script>

<style scoped>
.background-wrapper {
  position: absolute;
  inset: 0;
}
</style>
