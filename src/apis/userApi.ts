import { ApiResponseDTO } from '~/types'
import { axiosPublic } from './axios'
import { USER_CHECK_EMAIL } from './apiConstanst'
const userApi = {
  userCheckEmail(email: string): Promise<ApiResponseDTO<boolean>> {
    const url = USER_CHECK_EMAIL + '/' + email
    return axiosPublic.get(url)
  }
}

export default userApi
