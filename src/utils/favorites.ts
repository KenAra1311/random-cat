import { SupabaseClient, User } from '@supabase/supabase-js'
import { Routes } from 'common/enums'
import { Favorite } from 'interfaces/favorite'
import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import {
  fetch as fetchFavoritesRecord,
  remove as removeFavoriteRecord,
} from 'repositories/supabase_favorite'

export const fetchFavorites = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setFavorites: Dispatch<SetStateAction<Favorite[]>>
): Promise<void> => {
  try {
    if (!user) throw new Error('認証が正しくできてないようです。')

    setFavorites(await fetchFavoritesRecord(supabase, user))
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}

export const removeFavorite = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  { replace }: NextRouter,
  id: string
): Promise<void> => {
  try {
    if (!confirm('このねこ画像のお気に入りを削除しますか？')) return
    if (!user) throw new Error('認証が正しくできてないようです。')

    await removeFavoriteRecord(supabase, id)

    alert('このねこ画像のお気に入りを削除しました😹')
    replace(Routes.FAVORITES)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
