import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Routes } from 'common/enums'
import AvatarIcon from 'components/atoms/AvatarIcon'
import { useRouter } from 'next/router'
import { AuthContext } from 'providers/AuthProvider'
import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { fetchProfile } from 'utils/account'
import { logout as logoutUser } from 'utils/auth'

const AvatarMenu: React.FC = () => {
  const sharedState = useContext(AuthContext)
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => {
    fetchProfile(sharedState, setAvatar)
  }, [sharedState])

  const handleOpenUserMenu = ({
    currentTarget,
  }: React.MouseEvent<HTMLElement>) => setAnchorElUser(currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  const logout = () => logoutUser(sharedState, router)

  const menuItemList: {
    onClick: MouseEventHandler<HTMLAnchorElement>
    content: string
  }[] = [
    { onClick: () => router.push(Routes.ACCOUNT), content: 'アカウント情報' },
    { onClick: () => router.push(Routes.FAVORITES), content: 'お気に入り一覧' },
    { onClick: logout, content: 'ログアウト' },
  ]

  if (!sharedState.user) {
    return (
      <>
        <Tooltip title="メニュー">
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
          <MenuItem key={0} onClick={() => router.push(Routes.AUTH)} href="">
            <Typography textAlign="center">ログイン画面へ</Typography>
          </MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <Tooltip title="avatar">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AvatarIcon image={avatar} profile={sharedState.profile} />
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
        {menuItemList.map(({ onClick, content }, i) => (
          <MenuItem key={i} onClick={onClick} href="">
            <Typography textAlign="center">{content}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AvatarMenu
