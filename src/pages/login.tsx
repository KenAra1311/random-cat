import { useSession } from '@supabase/auth-helpers-react'
import { AuthForm } from 'interfaces/auth_form'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>()

  if (session) router.replace('/')

  const onSubmit = (data: AuthForm) => console.log(data)

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>メールアドレス:</label><br />
          <input type="text" {...register("email", { required: true })} />
        </div>
        {errors.email && <span>メールアドレスは必須です。</span>}
        <div>
          <label>パスワード:</label><br />
          <input type="password" {...register("password", { required: true })} />
        </div>
        {errors.password && <span>パスワードは必須です。</span>}
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </>
  )
}

export default LoginPage
