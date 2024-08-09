<template>
  <a-result status="success" title="Chúc mừng bạn đã hoàn thành bài kiểm tra">
    <template #extra>
      <a-flex gap="large" justify="center" align="center">
        <a-typography-title :level="3">
          Điểm số: {{ score }}
        </a-typography-title>
        <a-space>
          <a-typography-title :level="3">
            Số câu đúng: {{ correctAnswers }}/{{ numberQuestions }}
          </a-typography-title>
        </a-space>
      </a-flex>
      <a-button key="console" type="primary" @click="onReview"
        >Reivew lại bài</a-button
      >
      <a-button key="buy" @click="onCancel">Thoát</a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import { VIEW_MODES } from '~/constants/course'

const quizStore = useQuizStore()
const { correctAnswers, score } = quizStore.$state.result || {}
const numberQuestions = quizStore.questions.length

async function onReview() {
  Modal.destroyAll()
  await quizStore.fetchQuizSheet(useRoute().params.sheetId as string)
  navigateTo({
    query: {
      mode: VIEW_MODES.READ,
    },
  })
}
function onCancel() {
  Modal.destroyAll()
  navigateTo('/course/map')
}
</script>
