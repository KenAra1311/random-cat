import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import Layout from 'components/Layout'
import { Profile } from 'interfaces/profile'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { fetchProfile } from 'utils/setting'

const IndexPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [profile, setProfile] = useState<Profile>({} as Profile)

  useEffect(() => {
    fetchProfile(supabase, user, setProfile)
  }, [supabase, user])

  if (!user) router.replace(Routes.AUTH)

  return (
    <Layout title="アカウント情報">
      <h1>アカウント情報</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div>
            <label>ID</label>
            <br />
            <input type="text" disabled defaultValue={profile.id} />
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
        </div>
      </Suspense>
    </Layout>
  )
}

export default IndexPage