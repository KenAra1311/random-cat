import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { logout as logoutUser } from 'utils/auth'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: NextPage<Props> = ({ children, title }: Props) => {
  const supabaseClient = useSupabaseClient()
  const session = useSession()

  const logout = () => logoutUser(supabaseClient)

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
          {session && (
            <>
              {' '}
              | <button onClick={logout}>ログアウト</button>
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
