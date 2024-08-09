export interface GetMissionResponse {
  user: string
  course: string
  id: string
  title: string
  content?: string
  isComplete: boolean
  dueDate: string
  createdAt?: Date
  updatedAt?: Date
}
