export interface CourseModel {
  id: string;
  created_at: string;
  title: string | null;
  author: string | null;
  category: string | null;
  students:string | null;
  rating: string | null ;
  level: string | null;
  color: string | null;
}
