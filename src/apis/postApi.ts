import { CategoryRequestDTO, Post, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { CATEGORY_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'

const postApi = {
  getAllPosts(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = CATEGORY_URL
    return axiosPublic.get(url, { params })
  }
}
export default postApi
