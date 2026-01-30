export interface CourseModel {
  id: string;
  created_at: string;
  title: string | null;
  author: string ;
  category: string ;
  students:string ;
  rating: string  ;
  level: string ;
  color: string | null;
}
