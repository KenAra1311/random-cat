import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/profile'
import { Dispatch, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { fetchMe } from 'repositories/supabase_profile'

export const fetchProfile = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setProfile: Dispatch<SetStateAction<Profile>>,
  setValue: UseFormSetValue<Profile>
): Promise<void> => {
  if (!user) return

  try {
    const profile = await fetchMe(supabase, user)

    setProfile(profile)
    setValue('id', profile.id)
    setValue('created_at', profile.created_at)
    setValue('updated_at', profile.updated_at)
    setValue('email', profile.email)
    setValue('username', profile.username)
    setValue('website', profile.website)
    setValue('avatar_url', profile.avatar_url)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
