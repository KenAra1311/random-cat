import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/profile'

export const fetchMe = async (
  supabase: SupabaseClient<any, 'public', any>,
  { id }: User
): Promise<Profile> => {
  const { data, error, status } = await supabase
    .from('profiles')
    .select(`*`)
    .eq('id', id)
    .single()

  if (error && status !== 406) throw error

  return data as Profile
}

export const update = async (
  supabase: SupabaseClient<any, 'public', any>,
  { id }: User,
  profile: Profile
): Promise<void> => {
  const { error, status } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)

  if (error && status !== 406) throw error
}
