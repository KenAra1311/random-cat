import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from 'interfaces/database.types'
import { ChangeEvent } from 'react'

const Avatars = (supabase: SupabaseClient<Database, 'public', any>) =>
  supabase.storage.from('avatars')

export const download = async (
  supabase: SupabaseClient<Database, 'public', any>,
  path: string
): Promise<string> => {
  const { data, error } = await Avatars(supabase).download(path)

  if (error) throw error

  return URL.createObjectURL(data)
}

export const upload = async (
  supabase: SupabaseClient<Database, 'public', any>,
  { id }: User,
  { target: { files } }: ChangeEvent<HTMLInputElement>
): Promise<string> => {
  if (!files || files.length === 0) throw new Error('画像が選択されてません😿')

  const file = files[0]
  const fileExt = file.name.split('.').pop()
  const fileName = `${id}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await Avatars(supabase).upload(filePath, file, {
    upsert: true,
  })

  if (error) throw error

  return data.path
}
