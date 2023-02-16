import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from './database.types'
import { Favorite, Profile } from './table'

export type AuthProviderProps = {
  isLoading: boolean
  user: User | null
  supabase: SupabaseClient<Database, 'public', any> | null
  setSharedState: React.Dispatch<React.SetStateAction<AuthProviderProps>> | null
  profile: Profile | null
  favorites: Favorite[]
}
