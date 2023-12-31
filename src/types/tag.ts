import { BaseDTO } from '.'

export interface TagRequestDTO extends Tag {
  navigate: (to: string) => void
}

export interface Tag extends BaseDTO {
  id?: number
  tagName?: string
  color?: string
  usedYn?: string
}
