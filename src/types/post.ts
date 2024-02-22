import { BaseDTO, User, Tag } from '.'

export interface Post extends BaseDTO {
  id: number
  title: string
  description: string
  content: string
  slug: string
  thumbnail?: string
  thumbnailId?: number
  viewCnt?: number
  categoryId?: number
  tags?: (string | Tag)[]
  usedYn: 'Y' | 'N' | ''
  user: User

  [key: string]: any
}
