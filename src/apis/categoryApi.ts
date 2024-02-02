import { Category, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { CATEGORY_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'

const categoryApi = {
  getAllCategories(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Category[]>>> {
    const url = CATEGORY_URL
    return axiosPublic.get(url, { params })
  },

  addCategory(data: Category): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    return axiosPrivate.post(CATEGORY_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  editCategory(data: Category): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + data.id
    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  removeCategory(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + id
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
export default categoryApi
