<template>
  <a-flex gap="middle" vertical wrap="wrap">
    <app-count-down
      :endTime="endTimeCountDown"
      @finish="() => console.log('end')"
      class="count-down"
    />
    <a-card :title="courseStore.$state.courseName">
      <a-space direction="vertical">
        <a-typography-text strong
          >Số câu:
          <span>{{ quizStore.questions.length }}</span></a-typography-text
        >

        <a-typography-text strong
          >Thời gian:
          <span>{{ duration / 60 / 1000 }}</span>
          phút</a-typography-text
        >
        <a-typography-text strong
          >Họ và Tên:
          <span>{{
            `${owner?.firstName || ''} ${owner?.lastName || ''}`
          }}</span></a-typography-text
        >
      </a-space>
    </a-card>
    <a-card class="action-button">
      <a-pagination
        class="-center"
        simple
        :current="quizStore.questionIndex"
        @change="(page) => quizStore.goToQuestion(page, !props.readonly)"
        :total="quizStore.questions.length * 10"
      />
      <template #actions>
        <a-button
          type="text"
          style="width: 100%"
          danger
          @click="() => (props.readonly ? goHome() : openConfirmSubmitSheet())"
          >{{ `${props.readonly ? 'Thoát' : 'Nộp bài'}` }}</a-button
        >
        <!-- <a-typography-text
          strong
          type="danger"
          @click="() => console.log('exit')"
          >Thoát</a-typography-text
        > -->
      </template>
    </a-card>
  </a-flex>
</template>

<script setup lang="ts" script>
const props = defineProps<{
  readonly: boolean
}>()
const courseStore = useCourseStore()
const quizStore = useQuizStore()
const userStore = useUserStore()
const owner = computed(() => userStore.$state.owner)
const duration = computed(() =>
  props.readonly ? 0 : quizStore.$state.quizDuration
)
const endTimeCountDown = computed(() => Date.now() + duration.value)

function goHome() {
  navigateTo('/course/map')
}
</script>

<style scoped lang="scss">
.action-button {
  text-align: center;
}
.-center {
  text-align: center;
}
</style>
