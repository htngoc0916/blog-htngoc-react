import type { AvatarProps } from 'flowbite-react'
import { Avatar } from 'flowbite-react'

export interface AuthorAvatarProps extends AvatarProps {}

export default function AuthorAvatar(props: AuthorAvatarProps) {
  const { ...rest } = props
  return <Avatar {...rest}>{props.children}</Avatar>
}
