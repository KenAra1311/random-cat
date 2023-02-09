import { SupabaseClient, User } from '@supabase/supabase-js'
import { Profile } from 'interfaces/table'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { fetchMe, update } from 'repositories/supabase/db_profile'
import { download, upload } from 'repositories/supabase/storage_avatar'

export const fetchProfile = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  setProfile: Dispatch<SetStateAction<Profile>>,
  setAvatar: Dispatch<SetStateAction<string>>,
  setValue: UseFormSetValue<Profile>
): Promise<void> => {
  if (!user) return

  try {
    const profile = await fetchMe(supabase, user)
    setProfile(profile)

    const avatarUrl = await download(supabase, profile.avatar_url)
    if (avatarUrl) setAvatar(avatarUrl)

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

export const updateAvatar = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  data: Profile,
  e: ChangeEvent<HTMLInputElement>,
  setUploading: Dispatch<SetStateAction<boolean>>
) => {
  setUploading(true)
  try {
    data.avatar_url = await upload(supabase, user, e)
    await update(supabase, user, data)

    alert('アバター画像の更新が完了しました😺')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
  setUploading(false)
}

export const updateProfile = async (
  supabase: SupabaseClient<any, 'public', any>,
  user: User,
  data: Profile
) => {
  try {
    await update(supabase, user, data)

    alert('アカウント情報の更新が完了しました😺')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
