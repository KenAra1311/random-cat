import { SupabaseClient, User } from '@supabase/supabase-js'
import { Favorite } from 'interfaces/favorite'
import { Dispatch, SetStateAction } from 'react'
import { fetch as fetchFavoritesObj } from 'repositories/supabase_favorite'

export const fetchFavorites = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setFavorites: Dispatch<SetStateAction<Favorite[]>>
): Promise<void> => {
  try {
    if (!user) throw new Error('認証が正しくできてないようです。')

    setFavorites(await fetchFavoritesObj(supabase, user))
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
