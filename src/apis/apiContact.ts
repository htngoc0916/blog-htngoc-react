import { Contact, ApiResponseDTO } from '~/types'
import { CONTACT_SEND_IDEA, CONTACT_SEND_CONTACT } from './apiConstanst'
import { axiosPublic } from './axios'
import i18n from '~/i18n/i18n'

const contactApi = {
  sendIdea(data: Contact): Promise<ApiResponseDTO<Contact>> {
    return axiosPublic.post(CONTACT_SEND_IDEA, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language
      }
    })
  },

  sendContact(data: Contact): Promise<ApiResponseDTO<Contact>> {
    return axiosPublic.post(CONTACT_SEND_CONTACT, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language
      }
    })
  }
}
export default contactApi
