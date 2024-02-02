import {
  ApiResponseDTO,
  ListResponseDTO,
  User,
  UploadAvatarDTO,
  DeleteAvatarDTO,
  FileMaster,
  FilterPramsDTO
} from '~/types'
import { axiosPrivate, axiosPublic } from './axios'
import { USER_CHECK_EMAIL, USER_URL, USER_URL_AVATAR } from './apiConstanst'
import { getToken } from '~/utils/auth'
const userApi = {
  userCheckEmail(email: string): Promise<ApiResponseDTO<boolean>> {
    const url = USER_CHECK_EMAIL + '/' + email
    return axiosPublic.get(url)
  },

  getAllUsers(data: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<User[]>>> {
    const accessToken = getToken()
    return axiosPrivate.get(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        ...data.filter
      }
    })
  },

  getUserInfo(id: number): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + id
    return axiosPrivate.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  addUser(data: User): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    return axiosPrivate.post(USER_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  editUser(data: User): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + data.id

    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  removeUser(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + id
    return axiosPrivate.delete(url, {
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

    return axiosPrivate.post(USER_URL_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  deleteAvatar(data: DeleteAvatarDTO): Promise<ApiResponseDTO<string>> {
    const accessToken = getToken()
    const url = USER_URL_AVATAR + '/' + data.userId
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userApi
