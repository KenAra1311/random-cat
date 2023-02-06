import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Layout from 'components/Layout'
import { Favorite } from 'interfaces/favorite'
import { NextPage } from 'next'
import { Suspense, useEffect, useState } from 'react'

const AccountPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()

  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {}, [supabase, user])

  if (!user) return <></>

  return (
    <Layout title="お気に入り一覧">
      <h1>お気に入り一覧</h1>

      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </Layout>
  )
}

export default AccountPage
