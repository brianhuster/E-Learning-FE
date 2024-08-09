import type {
  RememberEntityInterface,
  RememberInterface,
} from './entities/remember.entity'
import remembers from '@/assets/data/remember.json'
const mockRemembers: RememberInterface[] = remembers

export const useRememberStore = defineStore({
  id: 'remember',
  state: () => ({
    remembers: [] as RememberEntityInterface[],
  }),
  actions: {
    async fetchRemembers() {
      const remembers: RememberEntityInterface[][] = mockRemembers.map(
        (figure) => {
          return figure.content.map((content) => {
            return {
              ...content,
              title: figure.title,
            }
          })
        }
      )
      this.remembers = remembers.flat()
    },
  },
})
