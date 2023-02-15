import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { formatDate } from 'common/time'
import AvatarIcon from 'components/atoms/AvatarIcon'
import Layout from 'components/Layout'
import { Profile } from 'interfaces/table'
import { NextPage } from 'next'
import { ChangeEvent, Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchProfile, updateAvatar, updateProfile } from 'utils/account'

const AccountPage: NextPage = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const { register, handleSubmit, setValue } = useForm<Profile>()

  const [profile, setProfile] = useState<Profile>({} as Profile)
  const [avatar, setAvatar] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    fetchProfile(supabase, user, setProfile, setAvatar, setValue)
  }, [supabase, user])

  if (!user) return <></>

  const upload = (e: ChangeEvent<HTMLInputElement>) =>
    updateAvatar(supabase, user, profile, e, setUploading)

  const save = (data: Profile) => updateProfile(supabase, user, data)

  return (
    <Layout title="アカウント情報">
      <Card sx={{ my: 2 }}>
        <Typography align="center" sx={{ my: 3 }}>
          <h1>アカウント情報</h1>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ my: 2 }}
          >
            <AvatarIcon image={avatar} profile={profile} />
          </Grid>
          <Box sx={{ mb: 2, mx: 2 }}>
            <Button variant="contained" component="label">
              アバター画像更新
              <input
                type="file"
                accept="image/*"
                onChange={upload}
                disabled={uploading}
                hidden
              />
            </Button>
          </Box>

          <Suspense fallback={<div>Loading...</div>}>
            <Box component="form" onSubmit={handleSubmit(save)}>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField label="ID" value={profile.id} disabled fullWidth />
              </Box>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField
                  label="メールアドレス"
                  value={profile.email}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField label="名前" fullWidth {...register('username')} />
              </Box>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField
                  label="Webサイト"
                  fullWidth
                  {...register('website')}
                />
              </Box>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField
                  label="登録日時"
                  value={profile.created_at}
                  disabled
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2, mx: 2 }}>
                <TextField
                  label="更新日時"
                  value={
                    profile.updated_at
                      ? formatDate(profile.updated_at)
                      : 'データなし'
                  }
                  disabled
                  fullWidth
                />
              </Box>
              <Box>
                <Button type="submit" variant="contained">
                  更新
                </Button>
              </Box>
            </Box>
          </Suspense>
        </Typography>
      </Card>
    </Layout>
  )
}

export default AccountPage
