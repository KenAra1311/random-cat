import { Button } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { formatDate } from 'common/time'
import AvatarIcon from 'components/atoms/AvatarIcon'
import Layout from 'components/Layout'
import { Profile } from 'interfaces/table'
import { NextPage } from 'next'
import { ChangeEvent, Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchProfile, updateAvatar, updateProfile } from 'utils/account'

const AccountPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const { register, handleSubmit, setValue } = useForm<Profile>()

  const [profile, setProfile] = useState<Profile>({} as Profile)
  const [avatar, setAvatar] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    fetchProfile(supabase, user, setProfile, setAvatar, setValue)
  }, [supabase, user])

  if (!user) return <></>

  const upload = (e: ChangeEvent<HTMLInputElement>) =>
    updateAvatar(supabase, user, profile, e, setUploading)

  const save = (data: Profile) => updateProfile(supabase, user, data)

  return (
    <Layout title="アカウント情報">
      <h1>アカウント情報</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <AvatarIcon image={avatar} profile={profile} />

        <form onSubmit={handleSubmit(save)}>
          <div>
            <label>ID</label>
            <br />
            <div>{profile.id}</div>
          </div>
          <div>
            <label>メールアドレス</label>
            <br />
            <div>{profile.email}</div>
          </div>
          <div>
            <label>名前</label>
            <br />
            <input type="text" {...register('username')} />
          </div>
          <div>
            <label>Webサイト</label>
            <br />
            <input type="text" {...register('website')} />
          </div>
          <div>
            <label>アバター</label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={upload}
              disabled={uploading}
            />
          </div>
          <div>
            <label>登録日時</label>
            <br />
            <div>{formatDate(profile.created_at)}</div>
          </div>
          <div>
            <label>更新日時</label>
            <br />
            <div>
              {profile.updated_at
                ? formatDate(profile.updated_at)
                : 'データなし'}
            </div>
          </div>
          <div>
            <Button type="submit" variant="contained">
              更新
            </Button>
          </div>
        </form>
      </Suspense>
    </Layout>
  )
}

export default AccountPage
