import { BaseDTO } from '.'

export interface CategoryRequestDTO extends Category {
  navigate: (to: string) => void
}

export interface Category extends BaseDTO {
  id?: number
  categoryName?: string
  description?: string
}
