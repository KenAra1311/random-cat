import { AuthForm } from 'interfaces/auth_form'
import { supabase } from 'lib/supabase'

export const authenticate = async (
  data: AuthForm,
  isLogin: boolean
): Promise<void> => {
  try {
    if (isLogin) {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      alert('認証用メールを送信しました。\nメールをご確認ください。')
    } else {
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
    }
  } catch (error: any) {
    alert(error.message)
  }
}
