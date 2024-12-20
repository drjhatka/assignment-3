import { config } from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTTokenPayload } from '../auth/auth.utils';
import { retrieveUserCredentialsFromToken } from "./blog.utils";
import { User } from "../users/user.model";
import { TBlog } from "./blog.interface";
import { TUser } from "../users/user.interface";
import { ObjectId } from 'mongodb';
// @ts-ignore: Object is possibly 'null'.

const getAllBlogs =catchAsync(async(req, res, next)=>{
    res.send({message:'test'})

})
const getSingleBlog =catchAsync(async(req, res, next)=>{

})
const createBlog=catchAsync(async(req, res, next)=>{
    //retrieve user email and role from jwt header as an array...
        const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    //find user in the database with the email provided....
        const user = await User.findOne({email:decoded.email}) 
        console.log(user)
    //assign user ID to blog author
        const blog:TBlog={
            title:req.body.title,
            author: user._id,
            content:req.body.content,
            isPublished:true
        };
    const result = await BlogService.createBlogIntoDB(blog)
    sendResponse(res, {success:true,  message:'Blog Created Successfully',statusCode:httpStatus.OK, data:result})
})

const updateBlog=catchAsync(async(req, res, next)=>{ //ONLY User can update blog NOT Admin...
    //retrieve user email and role from jwt header as an array
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    if(decoded.role ==='admin'){
        sendResponse(res, {success:false, message:"Admin Cannot Update Blogs", statusCode:httpStatus.UNAUTHORIZED, data:{} })
        return
    }
    // else{
    //     await BlogService.updateBlog()
    // }
})

const deleteBlog = catchAsync(async(req, res, next)=>{
    //admin can delete any blog but user can delete only their blog...
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization as string, config.jwt_secret as string)
    if(decoded.role ==='user'){
        //check if the blog is authored by the current logged in user...
        const blogID = req.params.id;
        sendResponse(res, {success:false,statusCode:httpStatus.UNAUTHORIZED, message:"Users are not allowed to delete Blogs", data:{blogID} })
        return
    }
})

export const BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}