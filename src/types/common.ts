export const defaultPagination = {
  pageNo: 1,
  pageSize: 10,
  totalElements: 0,
  totalPage: 0,
  last: false
}

export const defaultFilter = {
  pageNo: 1,
  pageSize: 10,
  sortBy: '',
  sortDir: 'DESC' as 'ASC' | 'DESC'
}

export enum API_STATUS {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  FORBIDDEN = 'FORBIDDEN'
}

export interface ApiResponseDTO<T> {
  date: Date
  message: string
  status: string
  data: T
}

export interface ListResponseDTO<T> {
  data: T
  pageNo: number
  pageSize: number
  totalElements: number
  totalPage: number
  last: boolean
}

export interface PaginationResponseDTO {
  pageNo: number
  pageSize: number
  totalElements: number
  totalPage: number
  last: boolean
}

export interface FilterPramsDTO {
  pageNo: number
  pageSize: number
  sortBy: string
  sortDir: 'ASC' | 'DESC'

  [key: string]: any
}

export interface BaseDTO {
  regId?: number
  regDt?: Date
  modId?: number
  modDt?: Date
}
