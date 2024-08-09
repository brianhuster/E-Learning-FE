<template>
  <a-flex gap="middle" vertical class="working-area">
    <a-card class="question" :title="question?._id">
      <a-space v-if="!isExam">
        <a-typography-text> level: </a-typography-text>
        <a-typography-text :editable="editing" v-model:content="level" />
        <a-typography-text>Chương: </a-typography-text>
        <a-typography-text :editable="editing" v-model:content="chapter" />
        <a-typography-text>Dạng: </a-typography-text>
        <a-typography-text :editable="editing" v-model:content="figure" />
        <a-typography-text>Loại câu hỏi: </a-typography-text>
        <a-select v-model:value="question.type" :disabled="!editing">
          <a-select-option
            v-for="[key, value] in Object.entries(QUESTION_TYPE)"
            :value="value"
            :key="key"
          >
            {{ key }}
          </a-select-option>
        </a-select>
      </a-space>
      <template #extra>
        <a-button @click="openModalReportQuestion" danger v-if="isExam">
          <alert-filled />
          Báo cáo sai đề
        </a-button>
        <a-button v-if="!isExam" @click="handleEdit">
          <EditOutlined />
          {{ editing ? 'Hoàn tất' : 'Sửa' }}
        </a-button>
      </template>
      <a-space class="list-image-wrapper" direction="vertical">
        <a-typography-title
          :level="3"
          class="question-content"
          :editable="editing"
          v-model:content="question.question"
        />
        <a-typography-text
          :editable="editing"
          v-model:content="question.note"
        />
        <AppImageList :editing="editing" v-model:images="question.images" />
      </a-space>
    </a-card>
    <a-card class="-center answer">
      <template #extra>
        <a-button @click="openModalGuideQuestion">
          <QuestionCircleOutlined />
          Gợi ý
        </a-button>
      </template>
      <a-checkbox-group
        v-if="question.type === QUESTION_TYPE.MULTIPLE_CHOICE"
        class="checkbox-group"
        v-model:value="question.config.answers"
        :disabled="!editing"
      >
        <template
          v-for="(option, index) in question.config.options"
          :key="index"
        >
          <a-space direction="vertical">
            <a-checkbox :value="option">{{ option }}</a-checkbox>
            <a-button v-if="editing" danger @click="deleteOption(index)"
              >x</a-button
            >
          </a-space>
        </template>
        <a-space v-if="editing">
          <a-input
            v-model:value="newOption"
            placeholder="Add new option"
          ></a-input>
          <a-button @click="addOption">Add</a-button>
        </a-space>
      </a-checkbox-group>

      <a-space
        class="write-input"
        v-if="question.type === QUESTION_TYPE.WRITE_INPUT"
      >
        <a-input
          v-model:value="question.config.answers[0]"
          show-count
          :disabled="!editing"
        />
      </a-space>
    </a-card>
    <a-card title="Lời giải">
      <AppImageList v-model:images="question.solveImg" :editing="editing" />
    </a-card>
  </a-flex>
  <a-modal
    title="Gợi ý"
    v-model:open="isModalGuideQuestionVisible"
    ok-text="Đã hiểu"
    cancel-text="Đóng"
    @ok="() => (isModalGuideQuestionVisible = false)"
    @cancel="() => (isModalGuideQuestionVisible = false)"
  >
    <AppImageList v-model:images="question.guideImg" :editing="editing" />
  </a-modal>
</template>

<script lang="ts" setup>
import { QUESTION_TYPE } from '~/constants/course'

defineProps<{
  isExam?: boolean
}>()
const question = defineModel('question', {
  required: true,
  default: new QuestionEntity(),
})
const level = computed({
  get: () => question.value.level.toString(),
  set: (newValue) => {
    question.value.level = Number(newValue)
  },
})

const chapter = computed({
  get: () => question.value.chapter.toString(),
  set: (newValue) => {
    question.value.chapter = Number(newValue)
  },
})

const figure = computed({
  get: () => question.value.figure.toString(),
  set: (newValue) => {
    question.value.figure = Number(newValue)
  },
})
const editing = ref(false)

const isModalGuideQuestionVisible = ref(false)
function openModalGuideQuestion() {
  isModalGuideQuestionVisible.value = true
}
function handleEdit() {
  console.log('editing', editing.value)
  if (editing.value) {
    useQuestionsStore().editQuestion(question.value)
  }
  editing.value = !editing.value
}
function deleteOption(index: number) {
  question.value.config.options.splice(index, 1)
}
const newOption = ref('')
function addOption() {
  console.log('addOption', newOption.value)
  question.value.config.options.push(newOption.value)
  newOption.value = ''
}
</script>
