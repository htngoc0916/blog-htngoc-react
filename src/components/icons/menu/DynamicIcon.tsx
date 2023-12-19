import * as icons from '~/components/icons/menu'
import React from 'react'

interface DynamicIconProps {
  iconName: icons.IconName
  className?: string
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className }) => {
  const IconComponent = icons.icons[iconName]

  return IconComponent ? <IconComponent className={className} /> : null
}

export default DynamicIcon
