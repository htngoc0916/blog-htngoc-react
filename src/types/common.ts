export enum API_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export interface ApiResponseDTO<T> {
  date: Date
  message: string
  status: string
  data: T
}

export interface ListResponseDTO<T> {
  data: T
  pagination: PaginationResponseDTO
}

export interface PaginationResponseDTO {
  pageNo: number
  pageSize: number
  totalElements: number
  totalPage: number
  last: boolean
}

export interface ListParamsDTO {
  _pageNo?: number
  _pageSize?: number
  _sortBy?: string
  _sortDir?: 'asc' | 'desc'

  [key: string]: any
}
