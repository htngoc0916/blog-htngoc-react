export enum API_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export interface ApiResponse<T> {
  date: Date
  message: string
  status: string
  data: T
}

export interface ListResponse<T> {
  data: T
  pagination: PaginationResponse
}

export interface PaginationResponse {
  pageNo: number
  pageSize: number
  totalElements: number
  totalPage: number
  last: boolean
}

export interface ListParams {
  _pageNo?: number
  _pageSize?: number
  _sortBy?: string
  _sortDir?: 'asc' | 'desc'

  [key: string]: any
}
