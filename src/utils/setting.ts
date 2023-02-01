import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/profile'
import { Dispatch, SetStateAction } from 'react'

export const fetchProfile = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setProfile: Dispatch<SetStateAction<Profile>>
): Promise<void> => {
  try {
    if (!user) throw new Error('認証が正しくできてないようです。')

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`id, email, username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    setProfile(data as Profile)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
