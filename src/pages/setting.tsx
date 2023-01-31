import { useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

const IndexPage: NextPage = () => {
  const user = useUser()
  const router = useRouter()

  const [profile, setProfile] = useState<{}>({})

  useEffect(() => {}, [])

  if (!user) router.replace(Routes.AUTH)

  return (
    <Layout title="アカウント情報">
      <h1>アカウント情報</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <input type="text" />
        </div>
      </Suspense>
    </Layout>
  )
}

export default IndexPage
