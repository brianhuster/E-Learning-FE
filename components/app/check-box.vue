<template>
  <a-checkbox-group v-model:value='selected' style='width: 100%'>
    <a-row v-for='item in props.options' :key='item'>
      <a-checkbox :value='item'>item</a-checkbox>
    </a-row>
  </a-checkbox-group>
</template>
<script lang='ts' setup>
const props = defineProps<{
  options: string[];
}>()
const selected = ref([])
</script>
