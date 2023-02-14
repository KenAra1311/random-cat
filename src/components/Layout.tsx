import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { Routes } from 'common/enums'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import AvatarMenu from './atoms/Layout/AvatarMenu'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }: Props) => {
  const router = useRouter()

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
      <AppBar position="static" sx={{ mt: -1 }}>
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
          <AvatarMenu />
        </Toolbar>
      </AppBar>
      {children}
      <footer>{TITLE} by KenAra</footer>
    </Container>
  )
}

export default Layout
