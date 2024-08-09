import type { ListQuestionResponse } from '../dto/listQuestion.response'

export interface QuestionStateEntity extends ListQuestionResponse {
  indexSelected?: number
  query: QuestionQueryEntity
}

export interface QuestionQueryEntity extends SearchEntity {
  id: string
  figure: string
  chapter: string
}
