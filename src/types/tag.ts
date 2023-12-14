import { BaseDTO } from '.'

export interface Tag extends BaseDTO {
  id: number
  tagName: string
  color: string
}
