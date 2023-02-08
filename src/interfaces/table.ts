import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export type Favorite = Database['public']['Tables']['favorites']['Row']
