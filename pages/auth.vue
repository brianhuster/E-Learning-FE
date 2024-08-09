<template>
  <div>auth</div>
</template>

<script lang="ts" setup>
import { useRememberStore } from '~/stores/remember'

const userStore = useUserStore()
const courseStore = useCourseStore()
try {
  await userStore.fetchProfile()
  sessionStorage.setItem('logged', 'true')
  await Promise.all([
    useAsyncData('get-course', () => courseStore.fetchCourse()),
  ])

  const { query } = useRoute()
  const { redirect, ...restQuery } = query
  navigateTo({
    path: redirect as string,
    query: restQuery,
  })
} catch (error) {
  navigateTo('/login')
}
</script>
