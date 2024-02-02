import { ApiResponseDTO } from '~/types'
import { axiosPublic } from './axios'
import { MENU_URL, MENU_GET_BY_CODE } from './apiConstanst'
import { Menu } from '~/types/menu'
import i18n from '~/i18n/i18n'
const menuApi = {
  getAllMenus(): Promise<ApiResponseDTO<Menu[]>> {
    return axiosPublic.get(MENU_URL, {
      headers: { 'Accept-Language': i18n.language }
    })
  },
  getAllMenuByCode(code: string): Promise<ApiResponseDTO<Menu[]>> {
    const url = MENU_GET_BY_CODE + '/' + code
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language }
    })
  }
}

export default menuApi
