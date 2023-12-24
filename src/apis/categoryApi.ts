import { CategoryRequestDTO, Category, ApiResponseDTO } from '~/types'
import { CATEGORY_URL, CATEGORY_GET_ALL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'

const categoryApi = {
  getAllCategories(): Promise<ApiResponseDTO<Category[]>> {
    const url = CATEGORY_GET_ALL
    return axiosPublic.get(url)
  },

  addCategory(data: CategoryRequestDTO): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    return axiosPrivate(data.navigate).post(CATEGORY_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  editCategory(data: CategoryRequestDTO): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + data.id
    return axiosPrivate(data.navigate).put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  removeCategory(id: number, navigate: (to: string) => void): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + id
    return axiosPrivate(navigate).delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
export default categoryApi
