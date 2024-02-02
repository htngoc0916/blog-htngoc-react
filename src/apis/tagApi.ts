import { ApiResponseDTO, ListResponseDTO, FilterPramsDTO, Tag } from '~/types'
import { TAG_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'
import i18n from '~/i18n/i18n'

const TagApi = {
  getAllTags(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Tag[]>>> {
    return axiosPublic.get(TAG_URL, { headers: { 'Accept-Language': i18n.language }, params })
  },

  addTag(data: Tag): Promise<ApiResponseDTO<Tag>> {
    const accessToken = getToken()
    return axiosPrivate.post(TAG_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  editTag(data: Tag): Promise<ApiResponseDTO<Tag>> {
    const accessToken = getToken()
    const url = TAG_URL + '/' + data.id
    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  removeTag(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = TAG_URL + '/' + id
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  }
}
export default TagApi
