import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Routes } from 'common/enums'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>ねこ祭り🐱 | {title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href={Routes.ROOT}>Home</Link> |{' '}
        <Link href={Routes.ABOUT}>About</Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      test aramaki
    </footer>
  </div>
)

export default Layout
