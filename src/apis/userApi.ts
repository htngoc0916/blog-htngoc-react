import {
  ApiResponseDTO,
  ListResponseDTO,
  FetchUserDTO,
  User,
  UserRequestDTO,
  UploadAvatarDTO,
  DeleteAvatarDTO,
  FileMaster
} from '~/types'
import { axiosPrivate, axiosPublic } from './axios'
import { USER_CHECK_EMAIL, USER_URL, USER_URL_AVATAR } from './apiConstanst'
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

  getUserInfo(id: number, navigate: (to: string) => void): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + id
    return axiosPrivate(navigate).get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  addUser(data: UserRequestDTO): Promise<ApiResponseDTO<User>> {
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
        // 'Content-Type': 'multipart/form-data',
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
  },

  uploadAvatar(data: UploadAvatarDTO): Promise<ApiResponseDTO<FileMaster>> {
    const accessToken = getToken()

    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('email', data.email)

    return axiosPrivate(data.navigate).post(USER_URL_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  deleteAvatar(data: DeleteAvatarDTO): Promise<ApiResponseDTO<string>> {
    const accessToken = getToken()
    const url = USER_URL_AVATAR + '/' + data.userId
    return axiosPrivate(data.navigate).delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userApi
