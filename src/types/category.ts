import { BaseDTO } from '.'

export interface Category extends BaseDTO {
  id?: number
  categoryName?: string
  description?: string
  usedYn?: string
}
