import { USER_ENDPOINT } from '~/constants/endpoint'
import type { LoginRequest } from './dto/login.request'
import type { SearchUserEntity, UserStateEntity } from './entity/state.entity'
import type { LoginResponse } from './dto/login.response'
import type { ProfileResponse } from './dto/profile.response'
import type { SignInRequest } from './dto/signIn.request'
import type { UserEntity } from './entity/user.entity'

export const useUserStore = defineStore('user', {
  state: (): UserStateEntity => ({
    total: 0,
    indexSelected: 0,
    users: [],
    query: {
      limit: '20',
      page: '0',
      term: '',
      role: '',
      id: '',
    },
  }),
  actions: {
    async login(payload: LoginRequest) {
      const response = (await $api(USER_ENDPOINT.login.path, {
        method: USER_ENDPOINT.login.method,
        body: payload,
      })) as LoginResponse
      const { token } = response
      localStorage.setItem('token', token)
    },
    async register(payload: SignInRequest) {
      return $api(USER_ENDPOINT.register.path, {
        method: USER_ENDPOINT.register.method,
        body: payload,
      })
    },
    async fetchProfile() {
      const profile = (await $api(USER_ENDPOINT.profile.path, {
        method: USER_ENDPOINT.profile.method,
      })) as ProfileResponse
      const { iat, exp, ...userInfo } = profile
      this.$patch({ owner: userInfo, iat, exp })
    },
    async fetchUsers(query: Object) {
      const data = (await $api(USER_ENDPOINT.getUsers.path, {
        query: {
          ...(query ?? this.query),
        },
      })) as UserStateEntity
      this.$patch({ ...data, indexSelected: 0 })
    },
    async editUser(user: UserEntity) {
      const { _id, createdAt, updatedAt, ...updatePayload } = user
      await $api(USER_ENDPOINT.editUser.path.replace('{userId}', _id), {
        method: USER_ENDPOINT.editUser.method,
        body: updatePayload,
      })
      message.success(`Edit user ${_id} successfully`)
    },
    async deleteUser(userId: string) {
      await $api(USER_ENDPOINT.deleteUser.path.replace('{userId}', userId), {
        method: USER_ENDPOINT.deleteUser.method,
      })
      message.success(`Delete user ${userId} successfully`)
    },
  },
})
