import { BaseDTO, User } from '.'
import { Tag } from './tag'

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
  user: User
}
