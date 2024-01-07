import { ApiResponseDTO, ListResponseDTO, FetchUserDTO, User, UserRequestDTO } from '~/types'
import { axiosPrivate, axiosPublic } from './axios'
import { USER_CHECK_EMAIL, USER_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
const userApi = {
  userCheckEmail(email: string): Promise<ApiResponseDTO<boolean>> {
    const url = USER_CHECK_EMAIL + '/' + email
    return axiosPublic.get(url)
  },
  getAllUsers(data: FetchUserDTO): Promise<ApiResponseDTO<ListResponseDTO<User[]>>> {
    const accessToken = getToken()
    return axiosPrivate(data.navigate).get(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        ...data.filter
      }
    })
  },

  addUser(data: UserRequestDTO): Promise<ApiResponseDTO<User>> {
    console.log('🚀 ~ file: userApi.ts:24 ~ addUser ~ data:', data)
    const accessToken = getToken()
    return axiosPrivate(data.navigate).post(USER_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  editUser(data: UserRequestDTO): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + data.id
    return axiosPrivate(data.navigate).put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  removeUser(id: number, navigate: (to: string) => void): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + id
    return axiosPrivate(navigate).delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userApi
