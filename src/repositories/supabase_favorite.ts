import { SupabaseClient, User } from '@supabase/supabase-js'
import { Favorite } from 'interfaces/favorite'

export const fetch = async (
  supabase: SupabaseClient<any, 'public', any>,
  { id }: User
): Promise<Favorite[]> => {
  const { data, error, status } = await supabase
    .from('favorites')
    .select('*')
    .eq('profile_id', id)

  if (error && status !== 406) throw error

  return data as Favorite[]
}

export const create = async (
  supabase: SupabaseClient<any, 'public', any>,
  favorite: Favorite
): Promise<void> => {
  const { error, status } = await supabase.from('favorites').insert(favorite)

  if (error && status !== 406) throw error
}
