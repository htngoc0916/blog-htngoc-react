import { Post, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { POST_URL } from './apiConstanst'
import { axiosPrivate, axiosPublic } from './axios'
import i18n from '~/i18n/i18n'
import { getToken } from '~/utils/auth'

const postApi = {
  getAllPosts(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = POST_URL
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language },
      params
    })
  },
  getHotPost(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = POST_URL
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language },
      params
    })
  },

  getPostById(id: number): Promise<ApiResponseDTO<Post>> {
    const url = POST_URL + '/' + id
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language }
    })
  },

  addPost(data: Post): Promise<ApiResponseDTO<Post>> {
    const accessToken = getToken()
    return axiosPrivate.post(POST_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  editPost(data: Post): Promise<ApiResponseDTO<Post>> {
    const accessToken = getToken()
    const url = POST_URL + '/' + data.id

    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  removePost(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = POST_URL + '/' + id
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  }
}
export default postApi
