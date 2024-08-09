import type { QuizAnswerSheetEntity } from './quizSheet.entity'

export interface QuizStateEntity extends QuizAnswerSheetEntity {
  questionIndex: number
  result?: SubmitQuizSheetResponse
}
