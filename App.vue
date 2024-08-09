<template>
  <VitePwaManifest />
  <a-spin :spinning="loading">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-spin>
</template>
<style>
body,
html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>

<script setup lang="ts">
const { loading } = useLoading()
window.onbeforeunload = function () {
  sessionStorage.removeItem('logged')
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
