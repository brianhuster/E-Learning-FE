import { NOTIFICATION_ENDPOINT } from '~/constants/endpoint'
import type { GetNotificationResponse } from './dto/getNotification.response'
import type { NotificationStateEntity } from './entity/state.entity'
import { NOTIFICATION_TYPE } from '~/constants/course'

export const useNotificationState = defineStore('notificationState', {
  state: (): NotificationStateEntity => ({
    notifications: [],
    total: 0,
    limit: 10,
    page: 1,
  }),
  getters: {
    remindQuestions: (state) => {
      return state.notifications.filter(
        (notification) =>
          notification.type === NOTIFICATION_TYPE.REMIND_QUESTION &&
          notification.isRead === false
      )
    },
  },
  actions: {
    async fetchNotifications() {
      const response: GetNotificationResponse = await $api(
        NOTIFICATION_ENDPOINT.getNotification.path
      )
      this.$patch({ ...response })
    },
    async makeRead(id: string) {
      await $api(NOTIFICATION_ENDPOINT.makeRead.path.replace('{id}', id), {
        method: NOTIFICATION_ENDPOINT.makeRead.method,
      })
      this.$state.notifications.find(
        (notification) => notification._id === id
      )!.isRead = true
    },
  },
})
