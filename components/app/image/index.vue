<template>
  <a-image :src="newSrc" :width="width" />
</template>

<script setup lang="ts">
const prefix = 'https://lh3.googleusercontent.com/d'
const props = defineProps<{
  src: string
  width?: number
}>()

const newSrc = computed(() => {
  if (!props.src) return ''
  const splitUrl = props.src.split('/')
  const dIndex = splitUrl.findIndex((path) => path === 'd')
  const imageId = splitUrl[dIndex + 1]
  const isGoogleDriveLink = props.src.includes('drive.google.com')
  if (isGoogleDriveLink) {
    return `${prefix}/${imageId}`
  }
  return props.src
})
</script>

<style scoped lang="scss">
iframe {
  min-width: 100%;
  min-height: 100%;
  border: none;
}
</style>
