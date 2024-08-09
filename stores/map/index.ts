import { USER_ENDPOINT } from '~/constants/endpoint'
import type { CaLendarStudyEntity, StudyMapStateEntity } from './entity/state'
import type { GetMissionResponse } from './dto/get-mission.response'
import { COURSE_ID } from '~/constants/course'

export const useStudyMapStore = defineStore('map', {
  state: (): StudyMapStateEntity => ({
    calendar: {},
    remainDays: 0,
    content: [],
    unlockIndex: 0,
  }),
  getters: {
    currentStudy: (state) => state.content[state.unlockIndex],
  },
  actions: {
    async fetchStudyMap() {
      const response = (await $api(USER_ENDPOINT.getStudyPath.path, {
        query: {
          courseId: COURSE_ID,
        },
      })) as any[]
      const { remainDays, content, unlockIndex } = response[0]
      this.$patch({ remainDays, content, unlockIndex })
    },
    async fetchMission() {
      const response: GetMissionResponse[] = await $api(
        USER_ENDPOINT.getMission.path
      )
      const calendar = response.reduce(
        (pre, { dueDate, isComplete, title, id }) => {
          const key = dueDate.split('T')[0]
          if (!pre[key]) {
            pre[key] = []
          }
          pre[key].push({
            complete: isComplete,
            message: title,
            id,
          })
          return pre
        },
        {} as Record<string, CaLendarStudyEntity[]>
      )
      this.$patch({ calendar })
    },
  },
})
