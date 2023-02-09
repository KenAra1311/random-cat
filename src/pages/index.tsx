import { Button } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import Layout from 'components/Layout'
import { Database } from 'interfaces/database.types'
import { NextPage } from 'next'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { createFavorite, fetchCatImage } from 'utils/index'

const IndexPage: NextPage = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [catImage, setCatImage] = useState<string>('')

  useEffect(() => {
    fetchCatImage(setCatImage)
  }, [])

  const randomCatImage = () => fetchCatImage(setCatImage)

  const favorite = () => createFavorite(supabase, user, catImage)

  return (
    <Layout title="Home">
      <h1>ねこ祭り🐱</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Button
            onClick={randomCatImage}
            variant="contained"
            color="secondary"
          >
            ねこを入れ替える🐈
          </Button>
        </div>
        <div>
          <img src={catImage} width={500} height="auto" />
        </div>
      </Suspense>

      {user ? (
        <div>
          <Button onClick={favorite} variant="contained" color="success">
            お気に入り登録⭐️
          </Button>
        </div>
      ) : (
        <div>
          アカウントを作成したら、お気に入り登録できます😄
          <br />
          <Link href={Routes.AUTH}>ログイン画面へ</Link>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
