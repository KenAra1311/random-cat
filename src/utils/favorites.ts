import { AuthProviderProps } from 'interfaces/auth_provider'
import { Favorite } from 'interfaces/table'
import { reloadFavorites } from 'providers/AuthProvider'
import { Dispatch, SetStateAction } from 'react'
import {
  fetch as fetchFavoritesRecord,
  remove as removeFavoriteRecord,
} from 'repositories/supabase/db_favorite'

export const fetchFavorites = async (
  { supabase, user }: AuthProviderProps,
  setFavorites: Dispatch<SetStateAction<Favorite[]>>
): Promise<void> => {
  if (!user) return

  try {
    setFavorites(await fetchFavoritesRecord(supabase, user))
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}

export const removeFavorite = async (
  sharedState: AuthProviderProps,
  id: string
): Promise<void> => {
  try {
    if (!confirm('このねこ画像のお気に入りを削除しますか？')) return
    if (!sharedState.user) throw new Error('認証が正しくできてないようです。')

    await removeFavoriteRecord(sharedState.supabase, id)
    await reloadFavorites(sharedState)

    alert('このねこ画像のお気に入りを削除しました😹')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
