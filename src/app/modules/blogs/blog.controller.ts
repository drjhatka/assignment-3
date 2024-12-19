import { catchAsync } from "../../utils/catchAsync";
import { TBlog } from "./blog.interface";
import { BlogService } from "./blog.service";


const getAllBlogs =catchAsync(async(req, res, next)=>{
    res.send({message:'test'})

})
const getSingleBlog =catchAsync(async(req, res, next)=>{

})
const createBlog=catchAsync(async(req, res, next)=>{
    //associate current logged in user with the blog being created

    const blog = BlogService.createBlogIntoDB(req.body)
})

const updateBlog=catchAsync(async(req, res, next)=>{
    
})

const deleteBlog = catchAsync(async(req, res, next)=>{
    
})

export const BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}