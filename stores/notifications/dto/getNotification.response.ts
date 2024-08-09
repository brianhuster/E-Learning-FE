import type { NotificationEntity } from '../entity/notification.entity'

export interface GetNotificationResponse {
  notifications: NotificationEntity[]
  total: number
}
