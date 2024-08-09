import type { QuestionEntity } from '../entities/question.entity'

export interface ListQuestionResponse {
  questions: QuestionEntity[]
  total: number
}
