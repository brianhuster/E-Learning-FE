import { COURSE_ENDPOINT, QUIZ_ENDPOINT } from '~/constants/endpoint'
import { COURSE_ID } from '~/constants/course'
import type { CourseEntity } from './entities/course.entity'
import course from '~/assets/mock/course.json'
import type { SubmitTargetRequest } from './dto/SubmitTarget.request'

const isMock = useRuntimeConfig().public.mockEnable

export const useCourseStore = defineStore('course', {
  state: (): Partial<CourseEntity> => ({
    chapters: [],
  }),
  actions: {
    async fetchCourse() {
      const response = isMock
        ? course
        : await $api(
            COURSE_ENDPOINT.getCourseById.path.replace('{courseId}', COURSE_ID),
            {
              method: COURSE_ENDPOINT.getCourseById.method,
            }
          )
      this.$patch(response as CourseEntity)
    },
    async submitTarget(target: SubmitTargetRequest): Promise<string> {
      const targetResponse: { _id: string } = isMock
        ? { _id: 'string' }
        : await $api(COURSE_ENDPOINT.submitTarget.path, {
            method: COURSE_ENDPOINT.submitTarget.method,
            body: target,
          })
      const joinQuizResponse: { sheetId: string } = isMock
        ? { sheetId: '123' }
        : await $api(QUIZ_ENDPOINT.joinQuizInput.path, {
            method: QUIZ_ENDPOINT.joinQuizInput.method,
            body: {
              studiedChapter: target.studiedChapter,
              studyPathId: targetResponse._id,
            },
          })
      return joinQuizResponse.sheetId
    },
  },
})
