import { format } from 'date-fns'

export const formatDate = (date: string | null): string =>
  date ? format(new Date(date), 'yyyy-MM-dd HH:mm:ss') : ''
