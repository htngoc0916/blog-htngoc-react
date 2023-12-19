import IconCategories from './IconCategories'
import IconDashboard from './IconDashBoard'
import IconPosts from './IconPosts'
import IconUsers from './IconUsers'
import IconTags from './IconTags'
import IconComments from './IconComments'
import IconSystem from './IconSystem'
import IconContacts from './IconContacts'

export const icons = {
  IconDashboard,
  IconUsers,
  IconCategories,
  IconPosts,
  IconTags,
  IconComments,
  IconSystem,
  IconContacts
} as const

export type IconName = keyof typeof icons
