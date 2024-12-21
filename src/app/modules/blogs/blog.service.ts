import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import { ObjectId } from 'mongodb';

const createBlogIntoDB = async (payload: TBlog) => {
    //assign current logged in user id to blog author field id...
    return (await Blog.create(payload)).populate('author')
}

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
    return await Blog.findOneAndUpdate({ _id: new ObjectId(id) }, payload).select(['_id', 'title', 'content', 'author']).populate('author')
}

const deleteBlog = async (id: string)=>{
    return await Blog.deleteOne({ _id: new ObjectId(id) })
}

export const BlogService = {
    createBlogIntoDB,
    updateBlog,
    deleteBlog
}