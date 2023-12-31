import { TagRequestDTO, ApiResponseDTO, ListResponseDTO, FilterPramsDTO, Tag } from '~/types'
import { TAG_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'

const TagApi = {
  getAllTags(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Tag[]>>> {
    return axiosPublic.get(TAG_URL, { params })
  },

  addTag(data: TagRequestDTO): Promise<ApiResponseDTO<Tag>> {
    const accessToken = getToken()
    return axiosPrivate(data.navigate).post(TAG_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  editTag(data: TagRequestDTO): Promise<ApiResponseDTO<Tag>> {
    const accessToken = getToken()
    const url = TAG_URL + '/' + data.id
    return axiosPrivate(data.navigate).put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  removeTag(id: number, navigate: (to: string) => void): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = TAG_URL + '/' + id
    return axiosPrivate(navigate).delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
export default TagApi
