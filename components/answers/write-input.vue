<template>
  <a-textarea
    v-model:value='value'
    placeholder='Autosize height based on content lines'
    auto-size
  />
</template>

<script setup lang='ts'>
defineProps<{
  value: string
}>()
</script>
