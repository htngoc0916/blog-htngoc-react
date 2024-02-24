import { PaginationResponseDTO, Post } from '.'

export interface Comment {}

export interface PostList {
  data: Post[]
  paginaton: PaginationResponseDTO
}
