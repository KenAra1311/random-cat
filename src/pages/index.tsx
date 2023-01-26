import Layout from 'components/Layout'
import { Suspense, useState } from 'react'
import { fetchCatImage } from 'utils/index'

const IndexPage = () =>{
  const [catImage, setCatImage] = useState<string>("https://cdn2.thecatapi.com/images/bpc.jpg")

  const randomCatImage = () => fetchCatImage(setCatImage)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
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
