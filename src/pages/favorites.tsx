import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Typography,
} from '@mui/material'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import { AuthContext } from 'providers/AuthProvider'
import { Suspense, useContext } from 'react'
import { removeFavorite } from 'utils/favorites'

const FavoritesPage: NextPage = () => {
  const sharedState = useContext(AuthContext)

  if (!sharedState.user) return <></>

  const remove = (id: string) => removeFavorite(sharedState, id)

  return (
    <Layout title="お気に入り一覧">
      <Box textAlign="center">
        <h1>お気に入り一覧</h1>
        <Typography component="legend">残お気に入り体力</Typography>
        <Rating
          defaultValue={2}
          max={10}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? 's' : ''}`
          }
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          style={{ color: '#ff3d47' }}
          readOnly
        />
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <ImageList sx={{ width: '100%' }}>
          {sharedState.favorites.map((f, i) => (
            <ImageListItem key={i}>
              <img
                src={`${f.url}?w=50%&fit=crop&auto=format`}
                srcSet={`${f.url}?w=50%&fit=crop&auto=format&dpr=2 2x`}
                alt={`お気に入り${i}`}
                loading="lazy"
              />
              <ImageListItemBar
                title={`お気に入り${i}`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${i}`}
                    onClick={() => remove(f.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Suspense>
    </Layout>
  )
}

export default FavoritesPage
