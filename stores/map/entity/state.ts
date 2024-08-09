export interface StudyMapStateEntity {
  remainDays: number
  calendar: Record<string, CaLendarStudyEntity[]>
  unlockIndex: number
  content: {
    element: string
    status: string
    lastStudy?: Date
  }[]
}

export interface CaLendarStudyEntity {
  id: string
  complete: boolean
  message: string
}
