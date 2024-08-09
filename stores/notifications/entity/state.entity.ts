import type { GetNotificationRequest } from '../dto/getNotification.request'
import type { GetNotificationResponse } from '../dto/getNotification.response'

export interface NotificationStateEntity
  extends GetNotificationRequest,
    GetNotificationResponse {}
