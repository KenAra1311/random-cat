import { AuthProviderProps } from 'interfaces/auth_provider'
import { reloadFavorites } from 'providers/AuthProvider'
import { remove as removeFavoriteRecord } from 'repositories/supabase/db_favorite'

export const removeFavorite = async (
  sharedState: AuthProviderProps,
  id: string
): Promise<void> => {
  try {
    if (!confirm('このねこ画像のお気に入りを削除しますか？')) return
    if (!sharedState.user) throw new Error('認証が正しくできてないようです。')

    await removeFavoriteRecord(sharedState.supabase, id)
    await reloadFavorites(sharedState)

    alert('このねこ画像のお気に入りを削除しました😹')
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(error)
  }
}
