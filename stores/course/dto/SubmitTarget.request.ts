export interface SubmitTargetRequest {
  score: number
  period: number
  remainDays: number
  studiedChapter: number[]
  studyPath: string[]
  courseId: string
}
