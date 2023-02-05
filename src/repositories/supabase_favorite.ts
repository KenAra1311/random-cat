import { SupabaseClient } from '@supabase/supabase-js'
import { Favorite } from 'interfaces/favorite'

export const create = async (
  supabase: SupabaseClient<any, 'public', any>,
  favorite: Favorite
): Promise<void> => {
  const { error, status } = await supabase.from('favorites').insert(favorite)

  if (error && status !== 406) throw error
}
