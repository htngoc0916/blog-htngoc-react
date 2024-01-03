import { ApiResponseDTO, ListResponseDTO, FetchUserDTO, User } from '~/types'
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
  }
}

export default userApi
