import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import AvatarIcon from 'components/atoms/AvatarIcon'
import { Profile } from 'interfaces/table'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from 'react'
import { fetchProfile } from 'utils/account'
import { logout as logoutUser } from 'utils/auth'

const AvatarMenu: React.FC = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [profile, setProfile] = useState<Profile>({} as Profile)
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => {
    fetchProfile(supabase, user, setProfile, setAvatar)
  }, [supabase, user])

  const handleOpenUserMenu = ({
    currentTarget,
  }: React.MouseEvent<HTMLElement>) => setAnchorElUser(currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  const logout = () => logoutUser(supabase, router)

  const menuItemList: {
    onClick: MouseEventHandler<HTMLAnchorElement>
    content: string
  }[] = [
    { onClick: () => router.push(Routes.ACCOUNT), content: 'アカウント情報' },
    { onClick: () => router.push(Routes.FAVORITES), content: 'お気に入り一覧' },
    { onClick: logout, content: 'ログアウト' },
  ]

  if (!user)
    return (
      <>
        <Tooltip title="avatar">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>
              <QuestionMarkIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => router.push(Routes.AUTH)} href="">
            <Typography textAlign="center">ログイン画面へ</Typography>
          </MenuItem>
        </Menu>
      </>
    )

  return (
    <>
      <Tooltip title="avatar">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AvatarIcon image={avatar} profile={profile} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItemList.map(({ onClick, content }) => (
          <MenuItem onClick={onClick} href="">
            <Typography textAlign="center">{content}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AvatarMenu
