<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>List</a-breadcrumb-item>
    <a-breadcrumb-item>App</a-breadcrumb-item>
  </a-breadcrumb>
  <a-flex justify="center" gap="middle" wrap="wrap" style="height: auto">
    <DuringQuizInformation :readonly="readonly" />
    <DuringQuizWorkingArea
      :readonly="readonly"
      @changePage="(value) => console.log(value)"
    />
  </a-flex>
</template>

<script lang="ts" setup>
import { VIEW_MODES } from '~/constants/course'

definePageMeta({
  layout: 'course',
})

const quizStore = useQuizStore()
const route = useRoute()
await useAsyncData('get-quiz', () =>
  quizStore.fetchQuizSheet(route.params.sheetId as string)
),
  quizStore.currentQuestion.histories.push({
    answers: [],
    start: new Date(),
    duration: 0,
  })

const readonly = computed(
  () => route.query.mode === VIEW_MODES.READ || !!quizStore.$state.submittedAt
)
</script>
