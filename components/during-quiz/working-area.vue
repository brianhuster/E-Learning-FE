<template>
  <a-flex gap="middle" vertical class="working-area">
    <a-card class="question" :title="questionTittle">
      <template #extra>
        <a-button @click="openModalReportQuestion" danger>
          <alert-filled />
          Báo cáo sai đề
        </a-button>
      </template>

      <a-space direction="vertical">
        <a-typography-text class="question-content">
          {{ selectedQuestion?.question }}</a-typography-text
        >
        <a-typography-text>
          {{ selectedQuestion?.note }}
        </a-typography-text>
        <a-space class="list-image-wrapper" vertical>
          <AppImage
            v-for="link in selectedQuestion?.images || []"
            :src="link"
            :key="link"
            :style="{ maxWidth: '100%', width: '600px' }"
            class="question-image"
          />
        </a-space>
      </a-space>
    </a-card>
    <a-card class="-center">
      <template #extra v-if="canShowGuide">
        <a-button @click="openModalGuideQuestion">
          <QuestionCircleOutlined />
          Gợi ý
        </a-button>
      </template>

      <a-modal
        title="Gợi ý"
        v-model:open="visableModalGuideQuestion"
        @ok="() => (visableModalGuideQuestion = false)"
        @cancel="() => (visableModalGuideQuestion = false)"
      >
        <AppImage
          v-for="src in selectedQuestion.guideImg"
          :src="src"
          :key="src"
        />
      </a-modal>
      <a-checkbox-group
        v-if="selectedQuestion?.type === QUESTION_TYPE.MULTIPLE_CHOICE"
        class="checkbox-group"
        :value="chossenAnwser"
        @update:value="(value) => (selectedQuestion.answers = value as string[])"
        :disabled="readonly"
        :options="selectedQuestion.options"
      >
        <template #label="{ value }">
          <a-typography-text
            :type="
              isTrueAnswer(value)
                ? 'success'
                : isWrongAnswer(value)
                ? 'danger'
                : undefined
            "
            >{{ value }}</a-typography-text
          >
        </template>
      </a-checkbox-group>

      <div
        class="write-input"
        v-if="selectedQuestion?.type === QUESTION_TYPE.WRITE_INPUT"
      >
        <a-input
          v-model:value="chossenAnwser[0]"
          show-count
          :disabled="readonly"
        >
          <template #addonBefore>
            <a-typography-text>Đáp án:</a-typography-text>
          </template>
        </a-input>
      </div>
      <a-typography-text
        v-if="$props.readonly"
        :type="getIsWrongQuestion ? 'danger' : 'success'"
      >
        <CloseCircleOutlined v-if="getIsWrongQuestion" />
        <CheckCircleOutlined v-else />
        Đáp án bạn chọn là
        {{ selectedQuestion.answers.join(',') }}</a-typography-text
      >
      <template #actions>
        <a-typography-link key="back" @click="() => goToQuestion(-1)"
          >Câu trước</a-typography-link
        >
        <a-typography-link key="back" @click="() => goToQuestion(0)"
          >Lưu đáp án</a-typography-link
        >
        <a-typography-link key="next" @click="() => goToQuestion(1)"
          >Câu tiếp theo</a-typography-link
        >
      </template>
    </a-card>

    <a-card title="Khảo sát" v-if="$props.readonly">
      <a-space direction="vertical">
        <a-typography-text>
          Bạn có khoanh bừa câu hỏi này không?
          <a-radio-group
            v-model:value="selectedQuestion.isRandom"
            :options="yesNoQuestion"
          />
        </a-typography-text>

        <a-typography-text>
          Bạn có thấy mình yếu câu này không?
          <a-radio-group
            v-model:value="selectedQuestion.isWeak"
            :options="yesNoQuestion"
          />
        </a-typography-text>
      </a-space>
    </a-card>

    <a-card v-if="canShowSolvement" title="Lời giải">
      <AppImage
        v-for="src in selectedQuestion.solveImg"
        :key="src"
        :src="src"
      />
    </a-card>
  </a-flex>
</template>

<script setup lang="ts">
import { QUESTION_TYPE, QUIZ_SHEET_CONFIG_TYPE } from '~/constants/course'
import { compareTwoArray } from '~/utils'
const visableModalGuideQuestion = ref(false)
const yesNoQuestion = [
  { label: 'Có', value: true },
  { label: 'Không', value: false },
]
const props = defineProps({
  readonly: Boolean,
})
const quizStore = useQuizStore()
const selectedQuestion = computed(() => quizStore.currentQuestion)
const canShowGuide = computed(
  () =>
    quizStore.$state.configType === QUIZ_SHEET_CONFIG_TYPE.LEVEL &&
    quizStore.questionIndex < 3
)
const canShowSolvement = computed(() => quizStore.$state.submittedAt)
const chossenAnwser = computed(() =>
  props.readonly
    ? selectedQuestion.value.rightAnswers
    : selectedQuestion.value.answers
)

const questionTittle = computed(
  () => `Câu hỏi ${quizStore.questionIndex}/ ${quizStore.questions.length}:`
)
const getIsWrongQuestion = computed(() => {
  return !quizStore.currentQuestion.correct
})

const emit = defineEmits(['changePage'])

function goToQuestion(offset: number) {
  quizStore.goToQuestion(quizStore.questionIndex + offset, !props.readonly)
}

function isWrongAnswer(value: string) {
  return (
    props.readonly &&
    !selectedQuestion.value.rightAnswers.includes(value) &&
    selectedQuestion.value.answers.includes(value)
  )
}

function isTrueAnswer(value: string) {
  return props.readonly && selectedQuestion.value.rightAnswers.includes(value)
}

function openModalGuideQuestion() {
  visableModalGuideQuestion.value = true
}

function isChooseWrongMultiple() {
  selectedQuestion.value.answers.sort()
  selectedQuestion.value.rightAnswers.sort()
  return !compareTwoArray(
    selectedQuestion.value.answers,
    selectedQuestion.value.rightAnswers
  )
}
</script>

<style scoped lang="scss">
.working-area {
  min-width: 50%;
  > .question {
    min-height: 35%;
  }
  .-center {
    text-align: center;
  }
}
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
