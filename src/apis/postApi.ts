import { Post, ApiResponseDTO, ListResponseDTO, FilterPramsDTO } from '~/types'
import {
  POST_GET_BY_SLUG,
  POST_GET_RELATED_BY_SLUG,
  POST_URL,
  POST_VIEW_COUNT,
  POST_GET_BY_CATEGORY,
  POST_CHECK_TITLE
} from './apiConstanst'
import { axiosPrivate, axiosPublic } from './axios'
import i18n from '~/i18n/i18n'
import { getToken } from '~/utils/auth'

export interface postTitle {
  title: string
}

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

  getPostBySlug(slug: string): Promise<ApiResponseDTO<Post>> {
    const url = POST_GET_BY_SLUG + '/' + slug
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language }
    })
  },

  getRelatedPostBySlug(slug: string): Promise<ApiResponseDTO<Post>> {
    const url = POST_GET_RELATED_BY_SLUG + '/' + slug
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language }
    })
  },

  getPostByCategory(params: FilterPramsDTO, categoryId: number): Promise<ApiResponseDTO<ListResponseDTO<Post[]>>> {
    const url = POST_GET_BY_CATEGORY + '/' + categoryId
    return axiosPublic.get(url, {
      headers: { 'Accept-Language': i18n.language },
      params
    })
  },

  postCheckTitle(data: postTitle): Promise<ApiResponseDTO<boolean>> {
    const accessToken = getToken()
    return axiosPrivate.put(POST_CHECK_TITLE, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': i18n.language
      }
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

  updateViewCount(slug: string): Promise<ApiResponseDTO<any>> {
    const url = POST_VIEW_COUNT + '/' + slug
    return axiosPublic.put(url, slug, {
      headers: {
        'Content-Type': 'application/json',
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
