import { supabase } from 'boot/supabase'
import type { CourseModel } from './model'

export async function getCourses(params: {
  page: number
  rowsPerPage: number
  sortBy?: string
  descending?: boolean
}) {
  const { page, rowsPerPage, sortBy, descending } = params

  const from = (page - 1) * rowsPerPage
  const to = from + rowsPerPage - 1

  let query = supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .range(from, to)

  if (sortBy) {
    query = query.order(sortBy, { ascending: !descending })
  }

  const { data, count, error } = await query

  if (error) throw error

  return {
    rows: data as CourseModel[],
    total: count ?? 0
  }
}
