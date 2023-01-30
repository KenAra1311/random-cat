import { Routes } from 'common/enums'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: NextPage<Props> = ({ children, title }: Props) => (
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
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      test aramaki
    </footer>
  </>
)

export default Layout
