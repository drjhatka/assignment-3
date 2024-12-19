import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB =async (payload:TBlog)=>{
    //assign current logged in user id to blog author field id...
    
    //return await Blog.create(payload)
}

export const BlogService = {
    createBlogIntoDB,
}