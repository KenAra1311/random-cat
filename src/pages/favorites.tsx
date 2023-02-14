import DeleteIcon from '@mui/icons-material/Delete'
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Layout from 'components/Layout'
import { Favorite } from 'interfaces/table'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { fetchFavorites, removeFavorite } from 'utils/favorites'

const FavoritesPage: NextPage = () => {
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
        <ImageList sx={{ width: '100%' }}>
          {favorites.map((f, i) => (
            <ImageListItem key={i}>
              <img
                src={`${f.url}?w=50%&fit=crop&auto=format`}
                srcSet={`${f.url}?w=50%&fit=crop&auto=format&dpr=2 2x`}
                alt={`お気に入り${i}`}
                loading="lazy"
              />
              <ImageListItemBar
                title={`お気に入り${i}`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${i}`}
                    onClick={() => remove(f.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Suspense>
    </Layout>
  )
}

export default FavoritesPage
