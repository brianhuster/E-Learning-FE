<template>
  <a-flex justify='space-around' align='flex-start' :vertical='true' gap='large' wrap='wrap'>
    <a-flex justify='space-around' align='flex-start' :vertical=false gap='large' style='width: 100%;'>
      <a-flex align='flex-start' :vertical=true gap='small'>
        <optional name='score' />
      </a-flex>
      <a-flex align='flex-start' :vertical=true gap='small'>
        <optional name='period' />
      </a-flex>
    </a-flex>
    <a-flex justify='space-around' align='flex-start' :vertical=false gap='large' style='width: 100%'>
      <a-flex align='flex-start' :vertical=true gap='small'>
        <optional name='testDate' />
      </a-flex>
      <a-flex align='flex-start' :vertical=true gap='small'>
        <optional name='quesType' />
      </a-flex>
    </a-flex>
  </a-flex>
</template>
<script lang='ts' setup>
import Optional from '~/components/course/optional.vue'
</script>
<style>

</style>