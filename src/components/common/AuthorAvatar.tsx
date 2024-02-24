import type { AvatarProps } from 'flowbite-react'
import { Avatar } from 'flowbite-react'
import { ReactNode } from 'react'

export interface AuthorAvatarProps extends AvatarProps {
  children?: ReactNode
  className?: string
}

export default function AuthorAvatar(props: AuthorAvatarProps) {
  const { children, className } = props
  return (
    <Avatar
      img={(_img) => {
        return <img src='/img/avatar_animal_1.jpg' className={className}></img>
      }}
    >
      {children}
    </Avatar>
  )
}
