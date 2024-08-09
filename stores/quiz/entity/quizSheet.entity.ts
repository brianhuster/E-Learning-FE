// create interface quiz sheet link quiz-answers.schema.ts

import type { QUIZ_SHEET_CONFIG_TYPE } from '~/constants/course'

export interface AnswerHistoryEntity {
  answers: string[]
  start: Date
  duration: number
  correct?: boolean
}

export interface LeanerQuestionEntity {
  note: string
  type: number
  questionId: string
  question: string
  images: string[]
  histories: AnswerHistoryEntity[]
  options?: string[]
  answers: string[]
  rightAnswers: string[]
  correct: boolean
  isRandom?: boolean
  isWeak?: boolean
  guideImg?: string[]
  solveImg?: string[]
}

export interface QuizAnswerSheetEntity {
  configType?: QUIZ_SHEET_CONFIG_TYPE
  courseId: string
  quizDuration: number
  fullName: String
  questions: LeanerQuestionEntity[]
  submittedAt?: Date
  score?: number
  createdAt?: Date
}
