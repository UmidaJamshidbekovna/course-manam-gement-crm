import { CourseModel } from "./model";

export function getCourse_DEFUALT():CourseModel{
    const object : CourseModel ={
        id:'',
        created_at: "",
         title: "",
        author: "",
         category: "",
        students:"",
        rating: "" ,
         level: "",
        color: ""
    }
    return object
}