import { AuthProviderProps } from 'interfaces/auth_provider'
import { Profile } from 'interfaces/table'
import { reloadProfile } from 'providers/AuthProvider'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { update } from 'repositories/supabase/db_profile'
import { download, upload } from 'repositories/supabase/storage_avatar'

export const fetchProfile = async (
  { supabase, user, profile }: AuthProviderProps,
  setAvatar: Dispatch<SetStateAction<string>>,
  setValue?: UseFormSetValue<Profile>
): Promise<void> => {
  if (!user) return

  try {
    if (profile.avatar_url) {
      const avatarUrl = await download(supabase, profile.avatar_url)
      if (avatarUrl) setAvatar(avatarUrl)
    }

    if (!setValue) return

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
  sharedState: AuthProviderProps,
  e: ChangeEvent<HTMLInputElement>,
  setUploading: Dispatch<SetStateAction<boolean>>
) => {
  setUploading(true)
  try {
    sharedState.profile.avatar_url = await upload(
      sharedState.supabase,
      sharedState.user,
      e
    )
    await update(sharedState.supabase, sharedState.user, sharedState.profile)
    await reloadProfile(sharedState)

    alert('アバター画像の更新が完了しました😺')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
  setUploading(false)
}

export const updateProfile = async (
  sharedState: AuthProviderProps,
  data: Profile
) => {
  try {
    await update(sharedState.supabase, sharedState.user, data)
    await reloadProfile(sharedState)

    alert('アカウント情報の更新が完了しました😺')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
