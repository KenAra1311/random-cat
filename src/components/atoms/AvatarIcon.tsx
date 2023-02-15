import PersonIcon from '@mui/icons-material/Person'
import { Avatar } from '@mui/material'
import { Profile } from 'interfaces/table'

type Props = {
  image: string
  profile: Profile
}

const AvatarIcon: React.FC<Props> = ({
  image,
  profile: { username },
}: Props) => {
  if (image)
    return (
      <Avatar src={image} alt="profile_avatar" sx={{ width: 56, height: 56 }} />
    )
  return (
    <Avatar alt="profile_avatar" sx={{ width: 56, height: 56 }}>
      {username ? username.slice(0, 1) : <PersonIcon />}
    </Avatar>
  )
}

export default AvatarIcon
