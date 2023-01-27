import { AuthForm } from "interfaces/auth_form"
import { supabase } from "lib/supabase"

export const register = async (data: AuthForm): Promise<void> => {
  try {
    const authResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    console.log(authResponse)
  } catch (error: any) {
    alert(error.message)
  }
}

export const login = async (data: AuthForm): Promise<void> => {
  try {
    const authResponse = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    console.log(authResponse)
  } catch (error: any) {
    alert(error.message)
  }
}
