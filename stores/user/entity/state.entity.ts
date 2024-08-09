import type { GetUserResponse } from '../dto/getUsers.reponse'
export interface UserStateEntity extends GetUserResponse {
  indexSelected?: number
  query: SearchUserEntity
  owner?: typeof UserEntity
  iat?: number
  exp?: number
}

export interface SearchUserEntity extends SearchEntity {
  term?: string
  role?: string
  id?: string
}
