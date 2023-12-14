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

export interface FetchPramsDTO {
  pageNo?: number
  pageSize?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'

  [key: string]: any
}

export interface BaseDTO {
  regId?: number
  regDt?: Date
  modId?: number
  modDt?: Date
}
