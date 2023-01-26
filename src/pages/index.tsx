import Layout from 'components/Layout'
import { useState } from 'react'
import {randomCatImage as utilRandomCatImage} from 'utils/index'

const IndexPage = () =>{
  const [catString, setCatString] = useState<string>("bpc")

  const randomCatImage = () => setCatString(utilRandomCatImage)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>ねこ祭り🐱</h1>
      <div>
        <button onClick={randomCatImage}>ねこを入れ替える🐈</button>
      </div>
      <div>
        <img src={`https://cdn2.thecatapi.com/images/${catString}.jpg`} />
      </div>
    </Layout>
  )
}

export default IndexPage
