export interface NotificationEntity {
  _id: string
  title: string
  type: number
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}
