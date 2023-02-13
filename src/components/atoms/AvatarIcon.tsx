import { Avatar } from '@mui/material'
import { Profile } from 'interfaces/table'

type Props = {
  image: string
  profile: Profile
}

const AvatarIcon: React.FC<Props> = ({ image, profile: { email } }: Props) => {
  if (image) return <Avatar src={image} alt="profile_avatar" />
  return <Avatar alt="profile_avatar">{email ? email.slice(0, 1) : ''}</Avatar>
}

export default AvatarIcon
