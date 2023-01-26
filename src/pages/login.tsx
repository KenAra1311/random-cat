import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useRouter } from 'next/router'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()

  if (session) router.replace('/')

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  )
}

export default LoginPage
