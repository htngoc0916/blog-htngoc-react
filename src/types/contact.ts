import { BaseDTO } from '.'

export interface Contact extends BaseDTO {
  id?: number
  fullName?: string
  email?: string
  content?: string
}
