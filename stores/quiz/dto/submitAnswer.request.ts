export interface SubmitAnswerRequest {
  sheetId: string
  questionIdx: number
  answers: string[]
  duration: number
}
