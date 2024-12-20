import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB =async (payload:TBlog)=>{
    //assign current logged in user id to blog author field id...
    return (await Blog.create(payload)).populate('author')
}

const updateBlog = async(payload:TBlog)=>{
    
}

export const BlogService = {
    createBlogIntoDB,
    updateBlog
}