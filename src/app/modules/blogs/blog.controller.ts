import { config } from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTTokenPayload } from '../auth/auth.utils';
import { retrieveUserCredentialsFromToken } from "./blog.utils";


const getAllBlogs =catchAsync(async(req, res, next)=>{
    res.send({message:'test'})

})
const getSingleBlog =catchAsync(async(req, res, next)=>{

})
const createBlog=catchAsync(async(req, res, next)=>{
    //retrieve user email and role from jwt header as an array
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)

    //const blog = BlogService.createBlogIntoDB(req.body)
    sendResponse(res, {success:true, statusCode:httpStatus.OK, message:'Inside controller', data:decoded})
})

const updateBlog=catchAsync(async(req, res, next)=>{ //ONLY User can update blog NOT Admin...
    //retrieve user email and role from jwt header as an array
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    if(decoded.role ==='admin'){
        sendResponse(res, {success:false,statusCode:httpStatus.UNAUTHORIZED, message:"Admin Cannot Update Blogs", data:{} })
        return
    }
    else{

    }
})

const deleteBlog = catchAsync(async(req, res, next)=>{
    //admin can delete blog but user cannot!
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    if(decoded.role ==='user'){
        sendResponse(res, {success:false,statusCode:httpStatus.UNAUTHORIZED, message:"Users are not allowed to delete Blogs", data:{} })
        return
    }
    else{
        
    }
})

export const BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}