import { BaseDTO } from '.'

export interface CategoryRequestDTO extends Category {}

export interface Category extends BaseDTO {
  id?: number
  categoryName?: string
  description?: string
  usedYn?: string
}
