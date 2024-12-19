import { config } from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTTokenPayload } from '../auth/auth.utils';


const getAllBlogs =catchAsync(async(req, res, next)=>{
    res.send({message:'test'})

})
const getSingleBlog =catchAsync(async(req, res, next)=>{

})
const createBlog=catchAsync(async(req, res, next)=>{
    //retrieve user email and role from jwt header
    const decoded = jwt.verify(req.headers.authorization as string, config.jwt_secret as string) as JwtPayload
    const email:string = decoded.email;
    const role:string = decoded.role;
     
    //const blog = BlogService.createBlogIntoDB(req.body)
    sendResponse(res, {success:true, statusCode:httpStatus.OK, message:'Inside controller', data:decoded})
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