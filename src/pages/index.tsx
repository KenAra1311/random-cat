import ReplayIcon from '@mui/icons-material/Replay'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from '@mui/material'
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
        <ImageList>
          <ImageListItem cols={12}>
            <img src={catImage} width="100%" />
            <ImageListItemBar
              actionIcon={
                <>
                  {sharedState.user && (
                    <Tooltip title="お気に入り登録⭐️">
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        onClick={favorite}
                      >
                        {sharedState.favorites.some(
                          (f) => f.url === catImage
                        ) ? (
                          <StarIcon />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="ねこを入れ替える🐈">
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={randomCatImage}
                    >
                      <ReplayIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          </ImageListItem>
        </ImageList>
      </Suspense>
    </Layout>
  )
}

export default IndexPage
