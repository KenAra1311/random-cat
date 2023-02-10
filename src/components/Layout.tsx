import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import { Profile } from 'interfaces/table'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { fetchProfile } from 'utils/account'
import { logout as logoutUser } from 'utils/auth'
import AvatarIcon from './atoms/AvatarIcon'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: NextPage<Props> = ({ children, title }: Props) => {
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

  const TITLE = 'ねこ祭り🐱'

  return (
    <Container maxWidth="md">
      <Head>
        <title>
          {TITLE} | {title}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            onClick={() => router.push(Routes.ROOT)}
            style={{ cursor: 'pointer' }}
          >
            {TITLE}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          {user && (
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
                <MenuItem onClick={() => router.push(Routes.ACCOUNT)}>
                  <Typography textAlign="center">アカウント情報</Typography>
                </MenuItem>
                <MenuItem onClick={() => router.push(Routes.FAVORITES)}>
                  <Typography textAlign="center">お気に入り一覧</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">ログアウト</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <footer>{TITLE} by KenAra</footer>
    </Container>
  )
}

export default Layout
