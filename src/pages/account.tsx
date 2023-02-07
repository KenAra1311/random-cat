import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { formatDate } from 'common/time'
import Layout from 'components/Layout'
import { Profile } from 'interfaces/profile'
import { NextPage } from 'next'
import { Suspense, useEffect, useState } from 'react'
import { fetchProfile } from 'utils/account'

const AccountPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()

  const [profile, setProfile] = useState<Profile>({} as Profile)

  useEffect(() => {
    fetchProfile(supabase, user, setProfile)
  }, [supabase, user])

  if (!user) return <></>

  return (
    <Layout title="アカウント情報">
      <h1>アカウント情報</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div>
            <label>ID</label>
            <br />
            <div>{profile.id}</div>
          </div>
          <div>
            <label>メールアドレス</label>
            <br />
            <input type="email" defaultValue={profile.email} />
          </div>
          <div>
            <label>名前</label>
            <br />
            <input type="text" defaultValue={profile.username} />
          </div>
          <div>
            <label>Webサイト</label>
            <br />
            <input type="text" defaultValue={profile.website} />
          </div>
          <div>
            <label>アバター</label>
            <br />
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="profile_avatar_url" />
            ) : (
              <>画像なし</>
            )}
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
        </div>
      </Suspense>
    </Layout>
  )
}

export default AccountPage
