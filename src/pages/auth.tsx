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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{title(isLogin)}</h1>
        <div>
          <label>メールアドレス:</label>
          <br />
          <input type="text" {...register('email', { required: true })} />
        </div>
        {errors.email && <span>メールアドレスは必須です。</span>}
        <div>
          <label>パスワード:</label>
          <br />
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        {errors.password && <span>パスワードは必須です。</span>}
        <div>
          <button type="submit">{title(isLogin)}</button>
        </div>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {title(!isLogin)}画面に切り替える
      </button>
    </>
  )
}

export default AuthPage
