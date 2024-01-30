import { Post, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { POST_URL } from './apiConstanst'
import { axiosPublic } from './axios'

const postApi = {
  getAllPosts(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = POST_URL
    return axiosPublic.get(url, { params })
  }
}
export default postApi
