import { Button } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { logout as logoutUser } from 'utils/auth'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: NextPage<Props> = ({ children, title }: Props) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const logout = () => logoutUser(supabaseClient, router)

  return (
    <>
      <Head>
        <title>ねこ祭り🐱 | {title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href={Routes.ROOT}>Home</Link> |{' '}
          <Link href={Routes.ABOUT}>About</Link>
          {user && (
            <>
              {' '}
              | <Link href={Routes.ACCOUNT}>アカウント情報</Link>|{' '}
              <Link href={Routes.FAVORITES}>お気に入り一覧</Link> |{' '}
              <Button onClick={logout} variant="text">
                ログアウト
              </Button>
            </>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        test aramaki
      </footer>
    </>
  )
}

export default Layout
