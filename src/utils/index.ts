import { AuthProviderProps } from 'interfaces/auth_provider'
import { CatImage } from 'interfaces/index'
import { Favorite } from 'interfaces/table'
import { reloadFavorites } from 'providers/AuthProvider'
import { Dispatch, SetStateAction } from 'react'
import {
  create,
  fetch as fetchFavorites,
} from 'repositories/supabase/db_favorite'
import { v4 as uuidv4 } from 'uuid'

export const fetchCatImage = async (
  setCatImage: Dispatch<SetStateAction<string>>
): Promise<void> => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result = (await res.json()) as CatImage[]

    setCatImage(result[0].url)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}

export const createFavorite = async (
  sharedState: AuthProviderProps,
  url: string
): Promise<void> => {
  try {
    const favorites: Favorite[] = await fetchFavorites(
      sharedState.supabase,
      sharedState.user
    )
    if (favorites.some((f) => f.url === url)) {
      throw new Error('このねこはすでにお気に入り登録済みです！')
    }

    const favorite: Favorite = {
      id: uuidv4(),
      url,
      profile_id: sharedState.user.id,
      created_at: null,
    }
    await create(sharedState.supabase, favorite)
    await reloadFavorites(sharedState)

    alert('表示されてるねこ画像をお気に入りしました！😸')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
