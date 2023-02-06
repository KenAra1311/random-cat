import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Layout from 'components/Layout'
import { Favorite } from 'interfaces/favorite'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { fetchFavorites, removeFavorite } from 'utils/favorites'

const AccountPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    fetchFavorites(supabase, user, setFavorites)
  }, [supabase, user])

  if (!user) return <></>

  const remove = (id: string) => removeFavorite(supabase, user, router, id)

  return (
    <Layout title="お気に入り一覧">
      <h1>お気に入り一覧</h1>

      <Suspense fallback={<div>Loading...</div>}>
        {favorites.map((f, i) => (
          <>
            <div>
              <img src={f.url} alt={`favorite_cat_image_${i}`} />
              <button onClick={() => remove(f.id)}>削除</button>
            </div>
            <hr />
          </>
        ))}
      </Suspense>
    </Layout>
  )
}

export default AccountPage
