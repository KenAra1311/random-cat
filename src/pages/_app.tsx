import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { Database } from 'interfaces/database.types'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useState } from 'react'

const MyApp: NextPage<AppProps<{ initialSession: Session }>> = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

  const Child = Component as any

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Child {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp
