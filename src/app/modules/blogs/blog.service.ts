import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import { ObjectId } from 'mongodb';

const createBlogIntoDB =async (payload:TBlog)=>{
    //assign current logged in user id to blog author field id...
    return (await Blog.create(payload)).populate('author')
}

const updateBlog = async(id:string, payload:Partial<TBlog>)=>{
    console.log(id, payload)
    return await Blog.findOneAndUpdate({_id:new ObjectId(id)}, payload).select(['_id','title','content','author']).populate('author')
}

export const BlogService = {
    createBlogIntoDB,
    updateBlog
}