import { Category, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import { CATEGORY_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate, axiosPublic } from './axios'
import i18n from '~/i18n/i18n'

const categoryApi = {
  getAllCategories(params: FilterPramsDTO): Promise<ApiResponseDTO<ListResponseDTO<Category[]>>> {
    const url = CATEGORY_URL
    return axiosPublic.get(url, {
      headers: {
        'Accept-Language': i18n.language
      },
      params
    })
  },

  addCategory(data: Category): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    return axiosPrivate.post(CATEGORY_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  editCategory(data: Category): Promise<ApiResponseDTO<Category>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + data.id
    return axiosPrivate.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  },

  removeCategory(id: number): Promise<ApiResponseDTO<null>> {
    const accessToken = getToken()
    const url = CATEGORY_URL + '/' + id
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
    })
  }
}
export default categoryApi
