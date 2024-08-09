<template>
  <a-flex justify="centere" align="flex-start" gap="large">
    <AppUser
      v-if="selectedUser?._id"
      v-model:user="selectedUser"
      class="user-info"
    />
    <AppSearch
      v-model:query="userStore.$state.query"
      v-model:searchResults="searchResults"
      v-model:selectedIndex="selectedIndex"
      :searchFunction="userStore.fetchUsers"
      :initSearch="true"
      class="search-area"
    />
  </a-flex>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const searchResults = computed(() => {
  return userStore.$state.users.map((user) => ({
    imageUrl: '',
    title: `Name: ${user.firstName} ${user.lastName}`,
    description: `Email: ${user.email}\nid: ${user._id}`,
  }))
})
// const selectedIndex = computed(() => userStore.$state.indexSelected || 0)
const selectedIndex = ref(0)
const selectedUser = computed(() => userStore.$state.users[selectedIndex.value])
</script>

<style lang="scss" scoped>
.user-info {
  min-width: 50%;
}
</style>
