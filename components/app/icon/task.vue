<template>
  <div @click="$emit('click')">
    <img
      :src="iconSrc"
      alt="First Task Icon"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
const props = defineProps<{
  disabled?: boolean
  type: number | '1' | '2' | '3' | '4' | 'end' | 'theory'
}>()

const iconSrc = computed(() => {
  return props.disabled
    ? `/icons/task/${props.type}-disable.svg`
    : `/icons/task/${props.type}.svg`
})
</script>
