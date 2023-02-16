import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { AuthProviderProps } from 'interfaces/auth_provider'
import { Database } from 'interfaces/database.types'
import React, { useEffect, useState } from 'react'
import { fetch as fetchFavorites } from 'repositories/supabase/db_favorite'
import { fetchMe } from 'repositories/supabase/db_profile'

export const AuthContext = React.createContext<AuthProviderProps>({
  isLoading: false,
  user: null,
  supabase: null,
  setSharedState: null,
  profile: null,
  favorites: [],
})

export const AuthProvider = ({ children }: { children: any }): JSX.Element => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [sharedState, setSharedState] = useState<AuthProviderProps>({
    isLoading: true,
    user,
    supabase,
    setSharedState: null,
    profile: null,
    favorites: [],
  })

  useEffect(() => {
    setCurrentUser(user)
    supabase.auth.onAuthStateChange(() => setCurrentUser(user))

    if (currentUser) {
      ;(async () => {
        const data = await getSupabaseData(
          supabase,
          currentUser,
          setSharedState
        )
        setSharedState(data)
      })()
    }
  }, [supabase, user, currentUser])

  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  )
}

const getSupabaseData = async (
  supabase: SupabaseClient<Database, 'public', any>,
  user: User,
  setSharedState: React.Dispatch<React.SetStateAction<AuthProviderProps>>
): Promise<AuthProviderProps> => {
  try {
    const promises = [fetchMe(supabase, user), fetchFavorites(supabase, user)]
    const [profile, favorites] = await Promise.all<any>(promises)

    return {
      isLoading: false,
      user,
      supabase,
      setSharedState,
      profile,
      favorites,
    }
  } catch (error) {
    console.log(error)

    return {
      isLoading: false,
      user: null,
      supabase: null,
      setSharedState: null,
      profile: null,
      favorites: [],
    }
  }
}

export const reloadProfile = async (sharedState: AuthProviderProps) => {
  const profile = sharedState.user
    ? await fetchMe(sharedState.supabase, sharedState.user)
    : null
  sharedState.setSharedState?.({ ...sharedState, profile })
}

export const reloadFavorites = async (sharedState: AuthProviderProps) => {
  const favorites = sharedState.user
    ? await fetchFavorites(sharedState.supabase, sharedState.user)
    : null
  sharedState.setSharedState?.({ ...sharedState, favorites })
}
