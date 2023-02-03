import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/profile'
import { Dispatch, SetStateAction } from 'react'
import { fetchMe } from 'repositories/supabase_profile'

export const fetchProfile = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setProfile: Dispatch<SetStateAction<Profile>>
): Promise<void> => {
  try {
    if (!user) throw new Error('認証が正しくできてないようです。')

    setProfile(await fetchMe(supabase, user))
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
