export interface SubmitQuizSheetResponse {
  sheetId: string
  score: number
  correctAnswers: number
  submittedAt?: Date,
}
