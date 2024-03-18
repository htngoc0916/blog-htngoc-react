import { BaseDTO, User, Tag, PostMeta } from '.'

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
  tags?: Tag[]
  postMetas?: PostMeta[]
  usedYn: 'Y' | 'N' | ''
  user: User

  [key: string]: any
}
