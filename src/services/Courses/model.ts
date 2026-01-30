export interface CourseModel {
  id: string;
  created_at: string;
  title: string | null;
  author: string | null;
  category: string | null;
  students:string ;
  rating: string  ;
  level: string ;
  color: string | null;
}
