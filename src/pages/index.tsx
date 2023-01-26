import Layout from 'components/Layout'
import { Suspense, useEffect, useState } from 'react'
import { fetchCatImage } from 'utils/index'

const IndexPage = () =>{
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
    </Layout>
  )
}

export default IndexPage
