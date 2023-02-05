import { SupabaseClient, User } from '@supabase/supabase-js'
import { Favorite } from 'interfaces/favorite'
import { CatImage } from 'interfaces/index'
import { Dispatch, SetStateAction } from 'react'
import { create } from 'repositories/supabase_favorite'
import { v4 as uuidv4 } from 'uuid'

export const fetchCatImage = async (
  setCatImage: Dispatch<SetStateAction<string>>
): Promise<void> => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result = (await res.json()) as CatImage[]

    setCatImage(result[0].url)
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}

export const createFavorite = async (
  supabase: SupabaseClient<any, 'public', any>,
  { id }: User,
  url: string
): Promise<void> => {
  try {
    const favorite: Favorite = { id: uuidv4(), url, profile_id: id }
    await create(supabase, favorite)

    alert('表示されてるねこ画像をお気に入りしました！😸')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
