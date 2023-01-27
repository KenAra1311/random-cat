import { useSession } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import Layout from 'components/Layout'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { fetchCatImage } from 'utils/index'

const IndexPage: React.FC = () =>{
  const session = useSession()

  const [catImage, setCatImage] = useState<string>('')

  useEffect(() => {
    fetchCatImage(setCatImage)
  }, [])

  const randomCatImage = () => fetchCatImage(setCatImage)

  return (
    <Layout title="Home">
      <h1>ねこ祭り🐱</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <button onClick={randomCatImage}>ねこを入れ替える🐈</button>
        </div>
        <div>
          <img src={catImage} width={500} height='auto' />
        </div>
      </Suspense>

      {session ? (
        <div>
          <button>お気に入り登録⭐️</button>
        </div>
      ) : (
        <div>
          アカウントを作成したら、お気に入り登録できます😄<br />
          <Link href={Routes.AUTH}>ログイン画面へ</Link>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
