import { Avatar } from '@mui/material'
import { Profile } from 'interfaces/table'
import { ReactNode } from 'react'

type Props = {
  image: string
  profile: Profile
}

const AvatarIcon: ReactNode = ({ image, profile: { email } }: Props) =>
  image ? (
    <Avatar src={image} alt="profile_avatar" />
  ) : (
    <Avatar alt="profile_avatar">{email ? email.slice(0, 1) : ''}</Avatar>
  )

export default AvatarIcon
