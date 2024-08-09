<template>
  <a-flex gap="large">
    <a-button type="primary" @click="openModal">
      <PlusOutlined />
      Thêm câu hỏi
    </a-button>
    <a-button
      type="primary"
      danger
      @click="questionsStore.deleteQuestion(selectedQuestion._id)"
    >
      <DeleteOutlined />
      Xóa câu hỏi
    </a-button>
  </a-flex>
  <br />
  <a-flex justify="space-arrow" align="right">
    <AppQuestion
      v-if="selectedQuestion?._id"
      v-model:question="selectedQuestion"
    />
    <AppSearch
      v-model:query="questionsStore.$state.query"
      v-model:searchResults="searchResults"
      v-model:selectedIndex="selectedIndex"
      :searchFunction="questionsStore.fetchQuestions"
      :initSearch="true"
      class="search-area"
    />
  </a-flex>
  <a-modal
    v-model:open="isModalVisible"
    @ok="submitQuestion"
    wrap-class-name="full-modal"
  >
    <AppQuestion :question="newQuestion" />
  </a-modal>
</template>

<script lang="ts" setup>
const selectedIndex = ref(0)
const questionsStore = useQuestionsStore()
const searchResults = computed(() => {
  return questionsStore.$state.questions.map((q) => ({
    imageUrl: q.images[0] || '',
    title: `id: ${q._id}`,
    description: q.question,
  }))
})
const selectedQuestion = computed(
  () => questionsStore.$state.questions[selectedIndex.value]
)
const isModalVisible = ref(false)
const newQuestion = ref(new QuestionEntity())
const openModal = () => {
  console.log('openModal')
  isModalVisible.value = true
}
const submitQuestion = async () => {
  const { _id, ...payload } = newQuestion.value
  await useQuestionsStore().createQuestion(payload)
  isModalVisible.value = false
}
</script>

<style lang="scss" scoped>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
