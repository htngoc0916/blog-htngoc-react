import IconCategories from './IconCategories'
import IconDashBoard from './IconDashBoard'
import IconPosts from './IconPosts'
import IconUsers from './IconUsers'
import IconTags from './IconTags'

export const icons = {
  IconDashBoard,
  IconUsers,
  IconCategories,
  IconPosts,
  IconTags
} as const

export type IconName = keyof typeof icons
