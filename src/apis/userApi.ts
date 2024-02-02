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
import i18n from '~/i18n/i18n'

const userApi = {
  userCheckEmail(email: string): Promise<ApiResponseDTO<boolean>> {
    const url = USER_CHECK_EMAIL + '/' + email
    return axiosPublic.get(url, { headers: { 'Accept-Language': i18n.language } })
  },

  getAllUsers(data: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<User[]>>> {
    const accessToken = getToken()

    return axiosPrivate.get(USER_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
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
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  addUser(data: User): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    return axiosPrivate.post(USER_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  editUser(data: User): Promise<ApiResponseDTO<User>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + data.id

    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  removeUser(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = USER_URL + '/' + id
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
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
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  deleteAvatar(data: DeleteAvatarDTO): Promise<ApiResponseDTO<string>> {
    const accessToken = getToken()
    const url = USER_URL_AVATAR + '/' + data.userId
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  }
}

export default userApi
