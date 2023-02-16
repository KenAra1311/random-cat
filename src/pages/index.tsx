import { Button } from '@mui/material'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import { AuthContext } from 'providers/AuthProvider'
import { Suspense, useContext, useEffect, useState } from 'react'
import { createFavorite, fetchCatImage } from 'utils/index'

const IndexPage: NextPage = () => {
  const sharedState = useContext(AuthContext)

  const [catImage, setCatImage] = useState<string>('')

  useEffect(() => {
    fetchCatImage(setCatImage)
  }, [])

  const randomCatImage = () => fetchCatImage(setCatImage)

  const favorite = () => createFavorite(sharedState, catImage)

  return (
    <Layout title="Home">
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
          <img src={catImage} width="100%" />
        </div>
      </Suspense>

      {sharedState.user && (
        <div>
          <Button onClick={favorite} variant="contained" color="success">
            お気に入り登録⭐️
          </Button>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
