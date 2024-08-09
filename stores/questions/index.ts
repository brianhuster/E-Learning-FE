import { MANAGER_QUESTION_ENDPOINT } from '~/constants/endpoint'
import type { QuestionStateEntity } from './entities/state.entity'
import type { ListQuestionResponse } from './dto/listQuestion.response'
import type { QuestionEntity } from './entities/question.entity'

export const useQuestionsStore = defineStore('questionState', {
  state: (): QuestionStateEntity => ({
    questions: [],
    total: 0,
    indexSelected: 0,
    query: {
      limit: '20',
      page: '0',
      id: '',
      figure: '',
      chapter: '',
    },
  }),
  actions: {
    async fetchQuestions(query: Object) {
      const data: ListQuestionResponse = await $api(
        `${MANAGER_QUESTION_ENDPOINT.getQuestions.path}`,
        {
          query: {
            ...(query ?? this.query),
          },
        }
      )
      this.$patch({ ...data, indexSelected: 0 })
    },
    async editQuestion(question: QuestionEntity) {
      const { _id, createdAt, ...updatePayload } = question
      await $api(
        `${MANAGER_QUESTION_ENDPOINT.editQuestion.path.replace(
          '{questionId}',
          _id
        )}`,
        {
          method: MANAGER_QUESTION_ENDPOINT.editQuestion.method,
          body: updatePayload,
        }
      )
      message.success(`Edit question ${_id} successfully`)
    },
    async createQuestion(payload: Omit<QuestionEntity, '_id'>) {
      const questionId: string = await $api(
        MANAGER_QUESTION_ENDPOINT.createQuestion.path,
        {
          method: MANAGER_QUESTION_ENDPOINT.createQuestion.method,
          body: payload,
        }
      )
      message.success(`Create question ${questionId} successfully`)
    },
    async deleteQuestion(questionId: string) {
      await $api(
        MANAGER_QUESTION_ENDPOINT.deleteQuestion.path.replace(
          '{questionId}',
          questionId
        ),
        {
          method: MANAGER_QUESTION_ENDPOINT.deleteQuestion.method,
        }
      )
      message.success(`Delete question ${questionId} successfully`)
    },
  },
})
