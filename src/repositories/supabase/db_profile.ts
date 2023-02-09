import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from 'interfaces/database.types'
import { Profile } from 'interfaces/table'

const Profiles = (supabase: SupabaseClient<Database, 'public', any>) =>
  supabase.from('profiles')

export const fetchMe = async (
  supabase: SupabaseClient<any, 'public', any>,
  { id }: User
): Promise<Profile> => {
  const { data, error, status } = await Profiles(supabase)
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
  const { error, status } = await Profiles(supabase)
    .update(profile)
    .eq('id', id)

  if (error && status !== 406) throw error
}
