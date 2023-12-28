import React, { SVGProps } from 'react'

const RenderIcon = (
  Icon: React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null,
  iconClasses: string
) => {
  if (Icon) {
    if (React.isValidElement(Icon)) {
      return React.cloneElement(Icon, {
        className: iconClasses
      })
    } else {
      return <Icon className={iconClasses} />
    }
  }
  return null
}

export default RenderIcon
