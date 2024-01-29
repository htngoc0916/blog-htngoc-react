import { BaseDTO, FilterPramsDTO, User, Tag } from '.'

export interface Post extends BaseDTO {
  id: number
  title: string
  description: string
  content: string
  slug: string
  thumbnail: string
  viewCnt: number
  categoryId: number
  tags: Set<Tag>
  usedYn: 'Y' | 'N' | ''
  user: User
}

export interface FetchPostDTO {
  navigate: (to: string) => void
  filter: FilterPramsDTO
}
