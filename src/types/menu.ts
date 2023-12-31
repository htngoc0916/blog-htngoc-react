export enum MENU_CODE {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}
export interface Menu {
  id: number
  menuCode: string
  menuName: string
  parentId: number
  menuOrd: number
  menuUrl: string
  menuIcon: string
  usedYn: string
  children?: Menu[]
}
