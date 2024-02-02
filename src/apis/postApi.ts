import { Post, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { POST_URL } from './apiConstanst'
import { axiosPublic } from './axios'
import i18n from '~/i18n/i18n'

const postApi = {
  getAllPosts(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = POST_URL
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language },
      params
    })
  }
}
export default postApi
