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

  if (sortBy) query = query.order(sortBy, { ascending: !descending })

  const { data, count, error } = await query
  if (error) throw error

  return { rows: data as CourseModel[], total: count ?? 0 }
}

export async function getTopCourses(limit = 10): Promise<CourseModel[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('students', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Supabase error:', error)
    return []
  }

  return data || []
}

export async function addCourse(course: CourseModel): Promise<CourseModel | null> {
  const { data, error } = await supabase
    .from('courses')
    .insert([
      {
        title: course.title,
        author: course.author,
        category: course.category,
        students: course.students,
        rating: course.rating,
        level: course.level,
        color: course.color
      }
    ])
    .select()

  if (error) {
    console.error('Supabase insert error:', error)
    return null
  }

  return data && data.length > 0 ? (data[0] as CourseModel) : null
}
