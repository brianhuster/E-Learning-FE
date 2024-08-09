import { QUIZ_ENDPOINT, NOTIFICATION_ENDPOINT } from '~/constants/endpoint'
import type { SubmitQuizSheetRequest } from './dto/submitQuizSheet.request'
import type { LeanerQuestionEntity } from './entity/quizSheet.entity'
import type { QuizStateEntity } from './entity/state.entity'

import quiz from '~/assets/mock/quiz.json'
import type { SubmitSurveryRequest } from './dto/submitSurvey.request'
import type { ReportQuestionRequest } from './dto/reportQuestion.request'
import type { AttemptQuizLevelRequest } from './dto/attemptQuizLevel.request'

const isMock = useRuntimeConfig().public.mockEnable

export const useQuizStore = defineStore('quiz', {
  state: (): QuizStateEntity => ({
    courseId: '',
    quizDuration: 0,
    questions: [],
    fullName: '',
    questionIndex: 1,
  }),
  getters: {
    currentQuestion(state): LeanerQuestionEntity {
      return state.questions[this.questionIndex - 1]
    },
  },
  actions: {
    async joinQuizLevel(payload: AttemptQuizLevelRequest): Promise<string> {
      const response: { sheetId: string } = await $api(
        QUIZ_ENDPOINT.joinQuizLevel.path,
        {
          method: QUIZ_ENDPOINT.joinQuizLevel.method,
          body: payload,
        }
      )
      return response.sheetId
    },
    async joinQuizEndFigure(payload: { figureId: string }): Promise<string> {
      const response: { sheetId: string } = await $api(
        QUIZ_ENDPOINT.joinQuizEndFigure.path,
        {
          method: QUIZ_ENDPOINT.joinQuizEndFigure.method,
          body: payload,
        }
      )
      return response.sheetId
    },
    async joinQuizTestExam(payload: { period: number }): Promise<string> {
      const response: { sheetId: string } = await $api(
        QUIZ_ENDPOINT.joinQuizTestExam.path,
        {
          method: QUIZ_ENDPOINT.joinQuizTestExam.method,
          body: payload,
        }
      )
      return response.sheetId
    },
    async fetchQuizSheet(sheetId: string) {
      // fetch quiz sheet from api
      const response = isMock
        ? quiz
        : await $api(
            QUIZ_ENDPOINT.getQuizSession.path.replace('{sessionId}', sheetId)
          )

      const { questions, submittedAt, ...sheetInfo } = response as {
        questions: any[]
        [key: string]: any
      }
      const mapQuestion: LeanerQuestionEntity[] = questions.map(
        ({
          question: questionConfig,
          histories,
          isRandom,
          isWeak,
          correct,
        }) => {
          const {
            question,
            _id,
            images,
            type,
            config: { options, answers = [] },
            note,
            guideImg = [],
            solveImg = [],
          } = questionConfig
          const currentAnswers = histories.at(-1)?.answers || []
          return {
            note,
            type,
            questionId: _id,
            question,
            images,
            options,
            histories: histories || [],
            answers: [...currentAnswers],
            rightAnswers: answers,
            correct,
            isRandom,
            isWeak,
            guideImg,
            solveImg,
          }
        }
      )
      // set quiz sheet to the store
      this.$patch({
        ...sheetInfo,
        submittedAt: submittedAt ? new Date(submittedAt) : undefined,
        questions: mapQuestion,
        questionIndex: 1,
      })
    },

    async submitAnswer(
      questionIdx: number,
      payload: Omit<SubmitAnswerRequest, 'sheetId' | 'questionIdx'>
    ) {
      if (isMock) return
      try {
        await $api(QUIZ_ENDPOINT.submitAnswer.path, {
          method: QUIZ_ENDPOINT.submitAnswer.method,
          body: {
            ...payload,
            sheetId: useRoute().params.sheetId,
            questionIdx: questionIdx - 1,
          },
        })
        message.success(`Submit question ${questionIdx} successfully`)
      } catch (error) {
        message.error(`Submit question ${questionIdx} failed`)
      }
    },

    async submitAnswerSurvey(payload: SubmitSurveryRequest) {
      await $api(QUIZ_ENDPOINT.submitSurvey.path, {
        method: QUIZ_ENDPOINT.submitSurvey.method,
        body: payload,
      })
    },

    async reportQuestion(message: string) {
      const payload: ReportQuestionRequest = {
        questionId: this.currentQuestion.questionId,
        message,
      }
      await $api(NOTIFICATION_ENDPOINT.reportQuestion.path, {
        method: NOTIFICATION_ENDPOINT.reportQuestion.method,
        body: payload,
      })
    },

    async submitQuizSheet() {
      const sheetId = useRoute().params.sheetId as string
      const payload: SubmitQuizSheetRequest = {
        sheetId,
      }

      const result: SubmitQuizSheetResponse = isMock
        ? {
            score: 100,
            correctAnswers: 10,
            sheetId: sheetId,
            submittedAt: new Date(),
          }
        : await $api(QUIZ_ENDPOINT.submitQuiz.path, {
            method: QUIZ_ENDPOINT.submitQuiz.method,
            body: payload,
          })
      this.$patch({ result })
    },

    goToQuestion(value: number, isCreateHistory = true) {
      if (value < 1 || value > this.questions.length) return
      if (!isCreateHistory) {
        const payload: SubmitSurveryRequest = {
          sheetId: useRoute().params.sheetId as string,
          questionIdx: this.questionIndex - 1,
          isRandom: this.currentQuestion.isRandom,
          isWeak: this.currentQuestion.isWeak,
        }
        this.submitAnswerSurvey(payload).catch(console.error)
        this.questionIndex = value
        return
      }
      const currentHistory = this.currentQuestion.histories.at(-1)!
      currentHistory.duration = Date.now() - currentHistory.start.valueOf()
      currentHistory.answers = [...this.currentQuestion.answers]
      this.submitAnswer(this.questionIndex, currentHistory).catch(console.error)
      this.questionIndex = value
      this.currentQuestion.answers = [
        ...(this.currentQuestion.histories.at(-1)?.answers || []),
      ]
      this.currentQuestion.histories.push({
        answers: [],
        start: new Date(),
        duration: 0,
      })
    },
  },
})
