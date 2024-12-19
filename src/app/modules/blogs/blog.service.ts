import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB =async (payload:TBlog)=>{
    //user must be created first or taken from the req object
    return await Blog.create(payload)
}

export const BlogService = {
    createBlogIntoDB,
}