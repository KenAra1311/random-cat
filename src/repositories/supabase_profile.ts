import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/profile'

export const fetchMe = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User
): Promise<Profile> => {
  const { data, error, status } = await supabase
    .from('profiles')
    .select(`*`)
    .eq('id', user.id)
    .single()

  if (error && status !== 406) throw error

  return data as Profile
}
