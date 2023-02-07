import { SupabaseClient } from '@supabase/supabase-js'
import { Routes } from 'common/enums'
import { AuthForm } from 'interfaces/auth_form'
import { NextRouter } from 'next/router'

export const title = (isLogin: boolean) =>
  isLogin ? 'ログイン' : 'アカウント登録'

export const authenticate = async (
  { auth }: SupabaseClient<any, 'public', any>,
  data: AuthForm,
  isLogin: boolean
): Promise<void> => {
  try {
    if (isLogin) {
      const { error } = await auth.signInWithPassword(data)
      if (error) throw error

      return
    }

    const { error } = await auth.signUp(data)
    if (error) throw error

    alert('認証用メールを送信しました。\nメールをご確認ください。')
  } catch (error: any) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}

export const logout = async (
  { auth }: SupabaseClient<any, 'public', any>,
  { replace }: NextRouter
) => {
  try {
    if (confirm('ログアウトしますか？')) {
      const { error } = await auth.signOut()
      if (error) throw error

      alert('ログアウトしました。')
      replace(Routes.ROOT)
    }
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
