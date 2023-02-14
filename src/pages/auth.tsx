import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Routes } from 'common/enums'
import { AuthForm } from 'interfaces/auth_form'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { authenticate, title } from 'utils/auth'

const AuthPage: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>()

  const [isLogin, setIsLogin] = useState<boolean>(true)

  if (user) router.replace(Routes.ROOT)

  const onSubmit = (data: AuthForm) =>
    authenticate(supabaseClient, data, isLogin)

  return (
    <Container maxWidth="md">
      <Card sx={{ my: 5 }}>
        <Typography align="center" sx={{ my: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{title(isLogin)}</h1>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="email"
                label="メールアドレス"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? 'メールアドレスは必須です。' : ''}
                {...register('email', { required: true })}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="password"
                label="パスワード"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? 'パスワードは必須です。' : ''}
                {...register('password', { required: true })}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button type="submit" variant="contained">
                {title(isLogin)}
              </Button>
            </Box>
          </form>
          <Button onClick={() => setIsLogin(!isLogin)} variant="text">
            {title(!isLogin)}画面に切り替える
          </Button>
        </Typography>
      </Card>
    </Container>
  )
}

export default AuthPage
