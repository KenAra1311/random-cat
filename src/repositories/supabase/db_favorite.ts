import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from 'interfaces/database.types'
import { Favorite } from 'interfaces/table'

const Favorites = (supabase: SupabaseClient<Database, 'public', any>) =>
  supabase.from('favorites')

export const fetch = async (
  supabase: SupabaseClient<Database, 'public', any>,
  { id }: User
): Promise<Favorite[]> => {
  const { data, error, status } = await Favorites(supabase)
    .select('*')
    .eq('profile_id', id)

  if (error && status !== 406) throw error

  return data as Favorite[]
}

export const create = async (
  supabase: SupabaseClient<any, 'public', any>,
  favorite: Favorite
): Promise<void> => {
  const { error, status } = await Favorites(supabase).insert(favorite)

  if (error && status !== 406) throw error
}

export const remove = async (
  supabase: SupabaseClient<any, 'public', any>,
  id: string
): Promise<void> => {
  const { error, status } = await Favorites(supabase).delete().match({ id })

  if (error && status !== 406) throw error
}
