import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";


const getAllBlogs =catchAsync(async(req, res, next)=>{
    res.send({message:'test'})

})
const getSingleBlog =catchAsync(async(req, res, next)=>{

})
const createBlog=catchAsync(async(req, res, next)=>{
    //check user credentials...
    
    

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